import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllEvents } from '../api/queries/getEvents';
import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { DropdownItem } from '../components/DropdownPicker/DropdownPicker';
import { Listing } from '../components/Listing/Listing';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { EVENT_FACETS } from '../constants/filters';
import { AthleteFiltersView } from '../features/AthleteFilters/AthleteFiltersView';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { Screen } from '../features/Screen/Screen';
import { initializeEvents } from '../helpers/events';
import { getLocationOptions, getSportOptions } from '../helpers/facets';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
// import { useEvents } from '../hooks/useEvents/useEvents';
import { useFacets } from '../hooks/useFacets/useFacets';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';

export const AddEventsScreen = ({ navigation, route }) => {
  const initialRoute = route?.params?.initialRoute;
  const key = route?.params?.key;

  const {
    data: events,
    isLoading: isFetchingInitialEvents,
    refetch: refetchEvents,
    isRefetching: isRefetchingEvents,
  } = useQuery('events', () => getAllEvents());
  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useQuery('sports', () => getAllSports());
  const { edit } = useEventFields();
  // const { add, clear } = useEvents();
  const [facets, setFacets] = useState<Record<string, any>>({
    [EVENT_FACETS.sport]: '',
    [EVENT_FACETS.location]: '',
  });
  const initialEvents = useMemo(() => {
    return initializeEvents(events, sports);
  }, [events, sports]);

  const filteredEvents = useFacets({
    initialItems: events?.length ? initialEvents : [],
    facets,
  });
  const { calcScrollOffset } = useScrollOffset(true);
  const [selectedEventIDs, setSelectedEventIDs] = useState<string[]>([]);
  const noneSelected = !selectedEventIDs?.length;

  const locationOptions = useMemo(() => getLocationOptions(events), [events]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: EVENT_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
      },
      {
        id: EVENT_FACETS.location,
        label: 'Location',
        facets: locationOptions,
      },
    ],
    [locationOptions, sportOptions]
  );

  const handleChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const handleRefresh = useCallback(() => {
    refetchEvents();
    refetchSports();
  }, [refetchEvents, refetchSports]);

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
  }, [edit, events, initialRoute, key, navigation, selectedEventIDs]);

  return (
    <Screen>
      <AthleteFiltersView facets={facetFilters} handleFacetsChange={handleChange} />
      <Listing
        data={filteredEvents}
        isLoading={isFetchingInitialEvents || isFetchingInitialSports}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item)}
            selected={selectedEventIDs.includes(item.id)}
          >
            <CardEvent item={item} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingEvents || isRefetchingSports}
        style={{ marginBottom: 170 }}
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
          {noneSelected ? 'Add' : `Add ${selectedEventIDs.length}`}
        </Button>
      </BottomActions>
    </Screen>
  );
};
