import { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { Listing } from '../components/Listing/Listing';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { EventFilters } from '../features/EventFilters/EventFilters';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { initializeEvents } from '../helpers/events';
import { getSportOptions, getStatusOptions } from '../helpers/facets';
import { useEventsQuery } from '../hooks/useEventsQuery/useEventsQuery';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';

export const EventsListingScreen = ({ navigation }) => {
  const {
    data: events,
    isLoading: isFetchingInitialEvents,
    refetch: refetchEvents,
    isRefetching: isRefetchingEvents,
  } = useEventsQuery();
  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useSportsQuery();

  const { eventFilterValues, eventSearchQuery } = useFilters();

  const filteredEvents = useSearchFacets({
    initialItems: events?.length ? initializeEvents(events, sports) : [],
    facets: eventFilterValues,
    query: eventSearchQuery,
  });

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  const statusOptions = useMemo(() => getStatusOptions(events), [events]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

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

  const renderItem = useCallback(
    ({ item }) => <CardEvent item={item} onCardPress={() => onCardPress(item)} />,
    [onCardPress]
  );

  if (isFetchingInitialEvents || isFetchingInitialSports) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <EventFilters statusOptions={statusOptions} sportOptions={sportOptions} />
      <Listing
        data={filteredEvents}
        renderItem={renderItem}
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
