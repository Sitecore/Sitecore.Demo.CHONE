import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllEvents } from '../api/queries/getEvents';
import { getAllSports } from '../api/queries/getSports';
import { Listing } from '../components/Listing/Listing';
import { EVENT_FACETS } from '../constants/filters';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { EventFilters } from '../features/EventFilters/EventFilters';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { initializeEvents } from '../helpers/events';
import { getLocationOptions, getSportOptions } from '../helpers/facets';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
import { useFacets } from '../hooks/useFacets/useFacets';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';

export const EventsListingScreen = ({ navigation }) => {
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
  const [facets, setFacets] = useState<Record<string, any>>({
    [EVENT_FACETS.sport]: '',
    [EVENT_FACETS.location]: '',
  });
  const filteredEvents = useFacets({
    initialItems: events?.length ? initializeEvents(events, sports) : [],
    facets,
  });
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const locationOptions = useMemo(() => getLocationOptions(events), [events]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const handleChange = useCallback((key: string, value: any) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: value }));
  }, []);

  const handleRefresh = useCallback(() => {
    refetchEvents();
    refetchSports();
  }, [refetchEvents, refetchSports]);

  const onCardPress = useCallback(
    (event: Event) => {
      navigation.navigate('EventDetail', { id: event.id, title: event.title });
    },
    [navigation]
  );

  if (isFetchingInitialEvents || isFetchingInitialSports) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <EventFilters
        filters={facets}
        locationOptions={locationOptions}
        onChange={handleChange}
        sportOptions={sportOptions}
      />
      <Listing
        data={filteredEvents}
        renderItem={({ item }) => <CardEvent item={item} onCardPress={() => onCardPress(item)} />}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingEvents || isRefetchingSports}
        style={{
          flex: 1,
        }}
      />
      <AnimatedFAB
        icon="plus"
        label="Add new event"
        extended={isTopEdge}
        onPress={() => navigation.navigate('AddEvent')}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </Screen>
  );
};
