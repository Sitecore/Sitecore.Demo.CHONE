import { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';

import { AnimatedButton } from '../components/AnimatedButton/AnimatedButton';
import { Listing } from '../components/Listing/Listing';
import { AthleteFilters } from '../features/AthleteFilters/AthleteFilters';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { initializeAthletes } from '../helpers/athletes';
import { getSportOptions, getStatusOptions } from '../helpers/facets';
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

  const statusOptions = useMemo(() => getStatusOptions(athletes), [athletes]);
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
      <AthleteFilters statusOptions={statusOptions} sportOptions={sportOptions} />
      <Listing
        data={filteredAthletes}
        renderItem={renderItem}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingAthletes || isRefetchingSports}
        onScroll={calcScrollOffset}
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.sm,
        }}
      />
      <AnimatedButton
        extended={isTopEdge}
        iconName="plus"
        label="Add athlete"
        onPress={() => navigation.navigate('CreateAthleteOverview')}
        style={styles.fab}
      />
    </Screen>
  );
};
