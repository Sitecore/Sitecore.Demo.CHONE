import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAthleteById } from '../api/queries/getAthletes';
import { BottomFAB } from '../components/BottomFAB/BottomFAB';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
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

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: athlete });
    navigation.navigate('EditAthlete', { stateKey, title: athlete.athleteName });
  }, [athlete, init, navigation]);

  const bottomActions = useMemo(
    () => (
      <BottomFAB
        icon={({ size }) => (
          <FontAwesomeIcon icon={faEdit} color={theme.colors.black.DEFAULT} size={size} />
        )}
        label="Edit"
        onPress={handleEditInfo}
      />
    ),
    [handleEditInfo]
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
      <ScrollView>
        <AthleteDetail athlete={athlete} />
      </ScrollView>
      {!isEditForbidden && bottomActions}
    </Screen>
  );
};
