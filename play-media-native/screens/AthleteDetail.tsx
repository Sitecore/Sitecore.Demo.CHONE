import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAthleteById } from '../api/queries/getAthletes';
import { AnimatedButton } from '../components/AnimatedButton/AnimatedButton';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';

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

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({
        title: athlete?.athleteName || 'Untitled athlete',
      });
    }, [athlete?.athleteName, navigation])
  );

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: athlete });
    navigation.navigate('EditAthlete', { stateKey, title: athlete.athleteName });
  }, [athlete, init, navigation]);

  const bottomActions = useMemo(
    () => (
      <AnimatedButton
        extended={isTopEdge}
        iconName="square-edit-outline"
        label="Edit"
        onPress={handleEditInfo}
        style={styles.fab}
      />
    ),
    [handleEditInfo, isTopEdge]
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
