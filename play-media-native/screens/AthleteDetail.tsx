import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { AnimatedFAB, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAthleteById } from '../api/queries/getAthletes';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { theme } from '../theme/theme';

const pageStyles = StyleSheet.create({
  sportAndNameContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
  },
  item: {
    marginBottom: theme.spacing.sm,
  },
  cardContainer: {
    marginVertical: theme.spacing.xs,
  },
  quoteContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xs,
  },
  quotationMark: {
    fontSize: 80,
    fontFamily: theme.fontFamily.italic,
    textAlign: 'center',
    lineHeight: 100,
    flexBasis: '15%',
  },
  quote: {
    fontSize: theme.fontSize.lg,
    lineHeight: theme.spacing.lg,
    fontFamily: theme.fontFamily.italic,
    flexBasis: '70%',
    paddingVertical: theme.spacing.lg,
    textAlign: 'center',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.black.light,
    paddingTop: theme.spacing.sm,
  },
  infoLabel: {
    color: theme.colors.gray.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.xxs,
  },
  infoItem: {
    color: theme.colors.white.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontFamily: theme.fontFamily.bold,
  },
  bottomFAB: {
    position: 'absolute',
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export const AthleteDetailScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const isEditForbidden = route?.params?.isEditForbidden;

  const { init } = useContentItems();

  const {
    data: athlete,
    error,
    isFetching,
  } = useQuery(`athlete - ${id}`, () => getAthleteById(id), { staleTime: 0 });

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params]);

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: athlete });
    navigation.navigate('EditAthlete', { stateKey });
  }, [athlete, init, navigation]);

  const bottomActions = useMemo(
    () => (
      <AnimatedFAB
        icon={({ size }) => (
          <FontAwesomeIcon icon={faEdit} color={theme.colors.black.DEFAULT} size={size} />
        )}
        label="Edit"
        extended={isTopEdge}
        onPress={handleEditInfo}
        style={pageStyles.bottomFAB}
      />
    ),
    [isTopEdge, handleEditInfo]
  );

  if (error) {
    return (
      <Screen centered>
        <Text>Athlete could not be fetched!</Text>
      </Screen>
    );
  }

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0}>
        <AthleteDetail athlete={athlete} />
      </ScrollView>
      {!isEditForbidden && bottomActions}
    </Screen>
  );
};
