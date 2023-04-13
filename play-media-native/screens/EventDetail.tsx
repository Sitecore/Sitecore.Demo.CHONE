import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';

import { getEventById } from '../api/queries/getEvents';
import { AnimatedButton } from '../components/AnimatedButton/AnimatedButton';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';

export const EventDetailScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const isEditForbidden = route?.params?.isEditForbidden;

  const {
    data: event,
    error,
    isFetching,
  } = useQuery(`event-${id}`, () => getEventById(id), { staleTime: 0 });

  const { init } = useContentItems();

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({
        title: event?.title || 'Untitled event',
      });
    }, [event?.title, navigation])
  );

  const handleEditInfo = useCallback(() => {
    const stateKey = generateID();

    init({ id: stateKey, fields: event });
    navigation.navigate('EditEvent', { stateKey, title: event.title });
  }, [event, init, navigation]);

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
