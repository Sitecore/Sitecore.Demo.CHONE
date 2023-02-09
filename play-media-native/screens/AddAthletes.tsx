import { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";
import { Button } from "react-native-paper";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { theme } from "../theme/theme";
import { SelectableView } from "../components/SelectableView/SelectableView";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useAthletes } from "../hooks/useAthletes/useAthletes";
import { ATHLETE_FACETS } from "../constants/filters";
import { useFacets } from "../hooks/useFacets/useFacets";
import { initializeAthletes, removeAlreadySelected } from "../helpers/athletes";
import { getAllSports } from "../api/queries/getSports";
import { getNationalityOptions, getSportOptions } from "../helpers/facets";
import { AthleteFiltersView } from "../features/AthleteFilters/AthleteFiltersView";
import { Screen } from "../features/Screen/Screen";
import { DropdownItem } from "../components/DropdownPicker/DropdownPicker";
import { styles } from "../theme/styles";
import { useEventFields } from "../hooks/useEventFields/useEventFields";
import { CONTENT_TYPES } from "../constants/contentTypes";

export const AddAthletesScreen = ({ navigation, route }) => {
  const contentType = useMemo(
    () => route?.params?.contentType,
    [route?.params]
  );
  const fieldKey = route?.params?.key;
  const single = route?.params?.single;
  const { eventFields, edit: editEventFields } = useEventFields();
  const { data: athletes, isFetching: isFetchingAthletes } = useQuery(
    "athletes",
    () => getAllAthletes()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const { add } = useAthletes();
  const [facets, setFacets] = useState<Record<string, any>>({
    [ATHLETE_FACETS.sport]: "",
    [ATHLETE_FACETS.nationality]: "",
  });
  const initialAthletes = useMemo(() => {
    const initialized = initializeAthletes(athletes, sports);
    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(initialized, eventFields[fieldKey])
      : removeAlreadySelected(initialized, eventFields[fieldKey]);
  }, [contentType, eventFields, fieldKey]);
  const filteredAthletes = useFacets({
    initialItems: athletes?.length ? initialAthletes : [],
    facets,
  });
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const [selectedAthleteIDs, setSelectedAthleteIDs] = useState<string[]>([]);
  const noneSelected = !selectedAthleteIDs?.length;
  const nationalityOptions = useMemo(
    () => getNationalityOptions(athletes),
    [athletes]
  );
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.nationality,
        label: "Nationality",
        facets: nationalityOptions,
      },
      {
        id: ATHLETE_FACETS.sport,
        label: "Sport",
        facets: sportOptions,
      },
    ],
    []
  );

  const edit = useCallback(
    ({ key, value }: { key: string; value: Athlete[] }) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({ key, value: [...eventFields[key], ...value] });
      } else if (contentType === CONTENT_TYPES.ATHLETE) {
        // TODO
      }
    },
    [contentType, editEventFields]
  );

  const handleChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const onSelect = useCallback((athlete: Athlete) => {
    setSelectedAthleteIDs((prevSelectedAthleteIDs) => {
      if (prevSelectedAthleteIDs.includes(athlete.id)) {
        return prevSelectedAthleteIDs.filter((item) => item !== athlete.id);
      }

      return [...prevSelectedAthleteIDs, athlete.id];
    });
  }, []);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!route?.params?.key || !route?.params?.initialRoute) {
      return;
    }

    edit({
      key: route.params.key,
      value: athletes.filter((item) => selectedAthleteIDs.includes(item.id)),
    });

    navigation.navigate(route.params.initialRoute);
  }, [add, athletes, edit, navigation, route?.params, selectedAthleteIDs]);

  return (
    <Screen>
      <AthleteFiltersView
        facets={facetFilters}
        handleFacetsChange={handleChange}
      />
      <FlatList
        data={filteredAthletes}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item as Athlete)}
            selected={selectedAthleteIDs.includes(item.id)}
          >
            <CardAvatar item={item as Athlete} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        style={{ paddingHorizontal: theme.spacing.sm, marginBottom: 70 }}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          disabled={noneSelected}
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onSubmit}
        >
          {noneSelected ? "Add" : `Add ${selectedAthleteIDs.length}`}
        </Button>
      </BottomActions>
    </Screen>
  );
};
