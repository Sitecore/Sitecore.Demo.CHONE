import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllAthletes } from '../api/queries/getAthletes';
import { getAllSports } from '../api/queries/getSports';
import { Listing } from '../components/Listing/Listing';
import { ATHLETE_FACETS } from '../constants/filters';
import { AthleteFilters } from '../features/AthleteFilters/AthleteFilters';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes } from '../helpers/athletes';
import { getNationalityOptions, getSportOptions } from '../helpers/facets';
import { useFacets } from '../hooks/useFacets/useFacets';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AthletesListingScreen = ({ navigation }) => {
  const {
    data: athletes,
    isLoading: isFetchingInitialAthletes,
    refetch: refetchAthletes,
    isRefetching: isRefetchingAthletes,
  } = useQuery('athletes', () => getAllAthletes(), {
    onSuccess: (athletes) => athletes.sort((a, b) => a.athleteName!.localeCompare(b.athleteName!)),
  });
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
  const filteredAthletes = useFacets({
    initialItems: athletes?.length ? initializeAthletes(athletes, sports) : [],
    facets,
  });
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const nationalityOptions = useMemo(() => getNationalityOptions(athletes), [athletes]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const handleChange = useCallback((key: string, value: any) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: value }));
  }, []);

  const handleRefresh = useCallback(() => {
    refetchAthletes();
    refetchSports();
  }, [refetchAthletes, refetchSports]);

  const onCardPress = useCallback(
    (athlete: Athlete) => {
      navigation.navigate('AthleteDetail', {
        id: athlete.id,
        title: athlete.athleteName,
      });
    },
    [navigation]
  );

  if (isFetchingInitialAthletes || isFetchingInitialSports) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <AthleteFilters
        filters={facets}
        nationalityOptions={nationalityOptions}
        onChange={handleChange}
        sportOptions={sportOptions}
      />
      <Listing
        data={filteredAthletes}
        renderItem={({ item }) => <CardAvatar item={item} onCardPress={() => onCardPress(item)} />}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingAthletes || isRefetchingSports}
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.sm,
        }}
      />
      <AnimatedFAB
        icon="plus"
        label="Add new athlete"
        extended={isTopEdge}
        onPress={() => navigation.navigate('AddAthlete')}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </Screen>
  );
};
