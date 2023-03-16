import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { AnimatedFAB, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAthleteById } from '../api/queries/getAthletes';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

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

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: athlete });
    navigation.navigate('EditAthlete', { stateKey, title: athlete.athleteName });
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
        style={styles.fab}
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
