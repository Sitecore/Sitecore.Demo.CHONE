import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "react-native-paper";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { theme } from "../theme/theme";
import { SelectableView } from "../components/SelectableView/SelectableView";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { EVENT_FACETS } from "../constants/filters";
import { useFacets } from "../hooks/useFacets/useFacets";
import { getAllSports } from "../api/queries/getSports";
import { getLocationOptions, getSportOptions } from "../helpers/facets";
import { AthleteFiltersView } from "../features/AthleteFilters/AthleteFiltersView";
import { Screen } from "../features/Screen/Screen";
import { DropdownItem } from "../components/DropdownPicker/DropdownPicker";
import { getAllEvents } from "../api/queries/getEvents";
import { initializeEvents, removeAlreadySelected } from "../helpers/events";
import { Event } from "../interfaces/event";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { styles } from "../theme/styles";
import { useEventFields } from "../hooks/useEventFields/useEventFields";
import { CONTENT_TYPES } from "../constants/contentTypes";
import { useAthleteFields } from "../hooks/useAthleteFields/useAthleteFields";
import { FlatList } from "react-native";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";

export const AddEventsScreen = ({ navigation, route }) => {
  const contentType = route?.params?.contentType;
  const fieldKey = route?.params?.key;
  const single = route?.params?.single;
  const initialRoute = route?.params?.initialRoute;

  const { eventFields, edit: editEventFields } = useEventFields();
  const { athleteFields, edit: editAthleteFields } = useAthleteFields();

  const { data: events, isFetching: isFetchingEvents } = useQuery(
    "events",
    () => getAllEvents()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );

  const [facets, setFacets] = useState<Record<string, any>>({
    [EVENT_FACETS.sport]: "",
    [EVENT_FACETS.location]: "",
  });
  const initialEvents = useMemo(() => {
    const initialized = initializeEvents(events, sports);
    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(initialized, eventFields[fieldKey])
      : removeAlreadySelected(initialized, athleteFields[fieldKey]);
  }, [athleteFields, contentType, eventFields, fieldKey, sports]);
  const filteredEvents = useFacets({
    initialItems: initialEvents?.length ? initialEvents : [],
    facets,
  });
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const [selectedEventIDs, setSelectedEventIDs] = useState<string[]>([]);
  const noneSelected = !selectedEventIDs?.length;

  const locationOptions = useMemo(() => getLocationOptions(events), [events]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: EVENT_FACETS.sport,
        label: "Sport",
        facets: sportOptions,
      },
      {
        id: EVENT_FACETS.location,
        label: "Location",
        facets: locationOptions,
      },
    ],
    []
  );

  const edit = useCallback(
    ({ key, value }: { key: string; value: Event[] }) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({ key, value: [...eventFields[key], ...value] });
      } else if (contentType === CONTENT_TYPES.ATHLETE) {
        editAthleteFields({ key, value: [...athleteFields[key], ...value] });
      }
    },
    [
      athleteFields,
      contentType,
      editAthleteFields,
      editEventFields,
      eventFields,
    ]
  );

  const handleFacetsChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const onSelect = useCallback((event: Event) => {
    setSelectedEventIDs((prevSelectedEventIDs) => {
      if (prevSelectedEventIDs.includes(event.id)) {
        return prevSelectedEventIDs.filter((item) => item !== event.id);
      }

      return [...prevSelectedEventIDs, event.id];
    });
  }, []);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!fieldKey || !initialRoute) {
      return;
    }

    edit({
      key: fieldKey,
      value: events.filter((item) => selectedEventIDs.includes(item.id)),
    });

    navigation.navigate(initialRoute);
  }, [edit, events, fieldKey, initialRoute, navigation, selectedEventIDs]);

  if (isFetchingEvents || isFetchingSports) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <AthleteFiltersView
        facets={facetFilters}
        handleFacetsChange={handleFacetsChange}
      />
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item as Event)}
            selected={selectedEventIDs.includes(item.id)}
          >
            <CardEvent item={item as Event} />
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
          {noneSelected ? "Add" : `Add ${selectedEventIDs.length}`}
        </Button>
      </BottomActions>
    </Screen>
  );
};
