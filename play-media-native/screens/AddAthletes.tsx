import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { DropdownItem } from '../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../components/FacetFilters/SimpleFilters';
import { Listing } from '../components/Listing/Listing';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { ATHLETE_FACETS } from '../constants/filters';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes, removeAlreadySelected } from '../helpers/athletes';
import { getSportOptions, getStatusOptions } from '../helpers/facets';
import { useAthletesQuery } from '../hooks/useAthletesQuery/useAthletesQuery';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AddAthletesScreen = ({ navigation, route }) => {
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const stateKey = route?.params?.stateKey;
  const headerTitle = route?.params?.title;

  const { visible: isVisible } = useFilters();

  const { contentItems, edit: editField } = useContentItems();

  const {
    data: athletes,
    isLoading: isFetchingInitialAthletes,
    refetch: refetchAthletes,
    isRefetching: isRefetchingAthletes,
  } = useAthletesQuery();
  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useSportsQuery();

  const [facets, setFacets] = useState<Record<string, any>>({
    [ATHLETE_FACETS.sport]: '',
    [ATHLETE_FACETS.nationality]: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const initialAthletes = useMemo(() => {
    const initialized = initializeAthletes(athletes, sports);
    return removeAlreadySelected(initialized, contentItems[stateKey][fieldKey]);
  }, [athletes, contentItems, fieldKey, sports, stateKey]);

  const filteredAthletes = useSearchFacets({
    initialItems: initialAthletes?.length ? initialAthletes : [],
    facets,
    query: searchQuery,
  });

  const { calcScrollOffset } = useScrollOffset(true);
  const [selectedAthleteIDs, setSelectedAthleteIDs] = useState<string[]>([]);
  const noneSelected = !selectedAthleteIDs?.length;

  const statusOptions = useMemo(() => getStatusOptions(athletes), [athletes]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
        selectedValue: facets?.[ATHLETE_FACETS.sport],
      },
      {
        id: ATHLETE_FACETS.status,
        label: 'Status',
        facets: statusOptions,
        selectedValue: facets?.[ATHLETE_FACETS.status],
      },
    ],
    [facets, sportOptions, statusOptions]
  );

  const edit = useCallback(
    ({ key, value }: { key: string; value: Athlete[] }) => {
      editField({ id: stateKey, key, value: [...contentItems[stateKey][key], ...value] });
    },
    [contentItems, editField, stateKey]
  );

  const handleFacetsChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleRefresh = useCallback(() => {
    refetchAthletes();
    refetchSports();
  }, [refetchAthletes, refetchSports]);

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
    if (!fieldKey || !initialRoute) {
      return;
    }

    edit({
      key: fieldKey,
      value: athletes.filter((item) => selectedAthleteIDs.includes(item.id)),
    });

    navigation.navigate(initialRoute, { title: headerTitle });
  }, [athletes, edit, fieldKey, headerTitle, initialRoute, navigation, selectedAthleteIDs]);

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
        data={filteredAthletes}
        isLoading={isFetchingInitialAthletes || isFetchingInitialSports}
        renderItem={({ item }) => (
          <SelectableView
            top={theme.spacing.xs}
            right={theme.spacing.sm}
            onSelect={() => onSelect(item as Athlete)}
            selected={selectedAthleteIDs.includes(item.id)}
          >
            <CardAvatar item={item as Athlete} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingAthletes || isRefetchingSports}
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.sm,
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
          {noneSelected ? 'Add' : `Add ${selectedAthleteIDs.length}`}
        </Button>
      </BottomActions>
    </Screen>
  );
};
