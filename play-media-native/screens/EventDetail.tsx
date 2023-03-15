import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getEventById } from '../api/queries/getEvents';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';
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
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title,
    });
  }, [event, navigation]);

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: event });
    navigation.navigate('EditEvent', { stateKey });
  }, [event, init, navigation]);

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

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Screen centered>Event could not be loaded!</Screen>;
  }

  return (
    <Screen>
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0}>
        <EventDetail event={event} />
      </ScrollView>
      {!isEditForbidden && bottomActions}
    </Screen>
  );
};
