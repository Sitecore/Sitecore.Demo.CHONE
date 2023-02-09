import { useCallback, useMemo, useState } from "react";
import { Listing } from "../components/Listing/Listing";
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
import { initializeEvents } from "../helpers/events";
import { Event } from "../interfaces/event";
import { useEvents } from "../hooks/useEvents/useEvents";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { styles } from "../theme/styles";
import { useEventFields } from "../hooks/useEventFields/useEventFields";

export const AddEventsScreen = ({ navigation, route }) => {
  const initialRoute = route?.params?.initialRoute;
  const key = route?.params?.key;

  const { data: events, isFetching: isFetchingEvents } = useQuery(
    "events",
    () => getAllEvents()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const { edit } = useEventFields();
  const { add, clear } = useEvents();
  const [facets, setFacets] = useState<Record<string, any>>({
    [EVENT_FACETS.sport]: "",
    [EVENT_FACETS.location]: "",
  });
  const filteredEvents = useFacets({
    initialItems: events?.length ? initializeEvents(events, sports) : [],
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

  const handleChange = useCallback((key: string, item: DropdownItem) => {
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
    edit({
      key,
      value: events.filter((item) => selectedEventIDs.includes(item.id)),
    });
    navigation.navigate(initialRoute);
  }, [edit, events, key, navigation, selectedEventIDs]);

  return (
    <Screen>
      <AthleteFiltersView
        facets={facetFilters}
        handleFacetsChange={handleChange}
      />
      <Listing
        data={filteredEvents}
        isLoading={isFetchingEvents || isFetchingSports}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item)}
            selected={selectedEventIDs.includes(item.id)}
          >
            <CardEvent item={item} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        style={{ paddingHorizontal: theme.spacing.sm, paddingBottom: 170 }}
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
