import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { DropdownItem } from '../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../components/FacetFilters/SimpleFilters';
import { Listing } from '../components/Listing/Listing';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { ATHLETE_FACETS } from '../constants/filters';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes, removeAlreadySelected } from '../helpers/athletes';
import { getSportOptions, getStatusOptions } from '../helpers/facets';
import { useAthleteFields } from '../hooks/useAthleteFields/useAthleteFields';
import { useAthletesQuery } from '../hooks/useAthletesQuery/useAthletesQuery';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AddAthletesScreen = ({ navigation, route }) => {
  const contentType = route?.params?.contentType;
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;

  const { eventFields, edit: editEventFields } = useEventFields();
  const { athleteFields, edit: editAthleteFields } = useAthleteFields();

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
    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(initialized, eventFields[fieldKey])
      : removeAlreadySelected(initialized, athleteFields[fieldKey]);
  }, [athleteFields, athletes, contentType, eventFields, fieldKey, sports]);

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
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({ key, value: [...eventFields[key], ...value] });
      } else if (contentType === CONTENT_TYPES.ATHLETE) {
        editAthleteFields({ key, value: [...athleteFields[key], ...value] });
      }
    },
    [athleteFields, contentType, editAthleteFields, editEventFields, eventFields]
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

    navigation.navigate(initialRoute);
  }, [athletes, edit, fieldKey, initialRoute, navigation, selectedAthleteIDs]);

  return (
    <Screen>
      <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
      <Listing
        data={filteredAthletes}
        isLoading={isFetchingInitialAthletes || isFetchingInitialSports}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item as Athlete)}
            selected={selectedAthleteIDs.includes(item.id)}
          >
            <CardAvatar item={item as Athlete} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingAthletes || isRefetchingSports}
        style={{ paddingHorizontal: theme.spacing.sm, marginBottom: 170 }}
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
