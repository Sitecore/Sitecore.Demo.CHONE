import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';

import { getEventById } from '../api/queries/getEvents';
import { BottomFAB } from '../components/BottomFAB/BottomFAB';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { theme } from '../theme/theme';

export const EventDetailScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const isEditForbidden = route?.params?.isEditForbidden;

  const {
    data: event,
    error,
    isFetching,
  } = useQuery(`event-id-${id}`, () => getEventById(id), { staleTime: 0 });

  const { init } = useContentItems();

  useEffect(() => {
    navigation.setOptions({
      title: event?.title,
    });
  }, [event, navigation]);

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: event });
    navigation.navigate('EditEvent', { stateKey, title: event.title });
  }, [event, init, navigation]);

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

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Screen centered>Event could not be loaded!</Screen>;
  }

  return (
    <Screen>
      <ScrollView>
        <EventDetail event={event} />
      </ScrollView>
      {!isEditForbidden && bottomActions}
    </Screen>
  );
};
