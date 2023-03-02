import { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { Listing } from '../components/Listing/Listing';
import { AthleteFilters } from '../features/AthleteFilters/AthleteFilters';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes } from '../helpers/athletes';
import { getNationalityOptions, getSportOptions } from '../helpers/facets';
import { useAthletesQuery } from '../hooks/useAthletesQuery/useAthletesQuery';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AthletesListingScreen = ({ navigation }) => {
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

  const { athleteFilterValues, athleteSearchQuery } = useFilters();

  const filteredAthletes = useSearchFacets({
    initialItems: athletes?.length ? initializeAthletes(athletes, sports) : [],
    facets: athleteFilterValues,
    query: athleteSearchQuery,
  });

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  const nationalityOptions = useMemo(() => getNationalityOptions(athletes), [athletes]);
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

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

  const renderItem = useCallback(
    ({ item }) => <CardAvatar item={item} onCardPress={() => onCardPress(item)} />,
    [onCardPress]
  );

  if (isFetchingInitialAthletes || isFetchingInitialSports) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <AthleteFilters nationalityOptions={nationalityOptions} sportOptions={sportOptions} />
      <Listing
        data={filteredAthletes}
        renderItem={renderItem}
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
        onPress={() => navigation.navigate('CreateAthleteOverview')}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </Screen>
  );
};
