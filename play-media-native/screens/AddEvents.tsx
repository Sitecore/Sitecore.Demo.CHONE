import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { DropdownItem } from '../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../components/FacetFilters/SimpleFilters';
import { Listing } from '../components/Listing/Listing';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { EVENT_FACETS } from '../constants/filters';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { Screen } from '../features/Screen/Screen';
import { initializeEvents, removeAlreadySelected } from '../helpers/events';
import { getSportOptions, getStatusOptions } from '../helpers/facets';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useEventsQuery } from '../hooks/useEventsQuery/useEventsQuery';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AddEventsScreen = ({ navigation, route }) => {
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const stateKey = route?.params?.stateKey;
  const headerTitle = route?.params?.title;

  const { visible: isVisible } = useFilters();

  const { contentItems, edit: editFields } = useContentItems();

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

  const [facets, setFacets] = useState<Record<string, any>>({
    [EVENT_FACETS.sport]: '',
    [EVENT_FACETS.location]: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const initialEvents = useMemo(() => {
    const initialized = initializeEvents(events, sports);
    return removeAlreadySelected(initialized, contentItems[stateKey][fieldKey]);
  }, [contentItems, events, fieldKey, sports, stateKey]);

  const filteredEvents = useSearchFacets({
    initialItems: initialEvents?.length ? initialEvents : [],
    facets,
    query: searchQuery,
  });

  const { calcScrollOffset } = useScrollOffset(true);
  const [selectedEventIDs, setSelectedEventIDs] = useState<string[]>([]);
  const noneSelected = !selectedEventIDs?.length;

  const statusOptions = useMemo(() => getStatusOptions(events), [events]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: EVENT_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
        selectedValue: facets?.[EVENT_FACETS.sport],
      },
      {
        id: EVENT_FACETS.status,
        label: 'Status',
        facets: statusOptions,
        selectedValue: facets?.[EVENT_FACETS.status],
      },
    ],
    [facets, sportOptions, statusOptions]
  );

  const edit = useCallback(
    ({ key, value }: { key: string; value: Event[] }) => {
      editFields({ id: stateKey, key, value: [...contentItems[stateKey][key], ...value] });
    },
    [contentItems, editFields, stateKey]
  );

  const handleFacetsChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
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
    if (!fieldKey || !initialRoute) {
      return;
    }

    edit({
      key: fieldKey,
      value: events.filter((item) => selectedEventIDs.includes(item.id)),
    });

    navigation.navigate(initialRoute, { title: headerTitle });
  }, [edit, events, fieldKey, initialRoute, navigation, selectedEventIDs, headerTitle]);

  const filters = useMemo(
    () =>
      isVisible && (
        <>
          <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
          <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
        </>
      ),
    [isVisible, facetFilters, handleFacetsChange, handleSearch, searchQuery]
  );

  return (
    <Screen>
      {filters}
      <Listing
        data={filteredEvents}
        isLoading={isFetchingInitialEvents || isFetchingInitialSports}
        renderItem={({ item }) => (
          <SelectableView
            top={theme.spacing.xs}
            right={theme.spacing.lg}
            onSelect={() => onSelect(item as Event)}
            selected={selectedEventIDs.includes(item.id)}
          >
            <CardEvent item={item as Event} isSimple />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingEvents || isRefetchingSports}
        style={{
          flex: 1,
          marginBottom: 75,
        }}
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
