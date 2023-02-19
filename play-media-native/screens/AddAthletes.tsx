import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllAthletes } from '../api/queries/getAthletes';
import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { DropdownItem } from '../components/DropdownPicker/DropdownPicker';
import { Listing } from '../components/Listing/Listing';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { ATHLETE_FACETS } from '../constants/filters';
import { AthleteFiltersView } from '../features/AthleteFilters/AthleteFiltersView';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes, removeAlreadySelected } from '../helpers/athletes';
import { getNationalityOptions, getSportOptions } from '../helpers/facets';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useFacets } from '../hooks/useFacets/useFacets';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AddAthletesScreen = ({ navigation, route }) => {
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const stateKey = route?.params?.stateKey;

  const { contentItems, edit: editField } = useContentItems();

  const {
    data: athletes,
    isLoading: isFetchingInitialAthletes,
    refetch: refetchAthletes,
    isRefetching: isRefetchingAthletes,
  } = useQuery('athletes', () => getAllAthletes());
  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useQuery('sports', () => getAllSports());
  const [facets, setFacets] = useState<Record<string, any>>({
    [ATHLETE_FACETS.sport]: '',
    [ATHLETE_FACETS.nationality]: '',
  });
  const initialAthletes = useMemo(() => {
    const initialized = initializeAthletes(athletes, sports);
    return removeAlreadySelected(initialized, contentItems[stateKey][fieldKey]);
  }, [athletes, contentItems, fieldKey, sports, stateKey]);
  const filteredAthletes = useFacets({
    initialItems: initialAthletes?.length ? initialAthletes : [],
    facets,
  });
  const { calcScrollOffset } = useScrollOffset(true);
  const [selectedAthleteIDs, setSelectedAthleteIDs] = useState<string[]>([]);
  const noneSelected = !selectedAthleteIDs?.length;
  const nationalityOptions = useMemo(() => getNationalityOptions(athletes), [athletes]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.nationality,
        label: 'Nationality',
        facets: nationalityOptions,
      },
      {
        id: ATHLETE_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
      },
    ],
    [nationalityOptions, sportOptions]
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
      <AthleteFiltersView facets={facetFilters} handleFacetsChange={handleFacetsChange} />
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
