import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getEventById } from '../api/queries/getEvents';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

const pageStyles = StyleSheet.create({
  bottomFAB: {
    position: 'absolute',
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
  button: {
    position: 'absolute',
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export const EventDetailScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const isEditForbidden = route?.params?.isEditForbidden;

  const [error, setError] = useState<unknown>();

  const { data: event, isFetching } = useQuery('event', () => getEventById(id), {
    onError: (error) => {
      setError(error);
    },
  });

  const { init, reset } = useEventFields();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title,
    });
  }, [event, navigation]);

  const handleEditInfo = useCallback(() => {
    init(event);
    navigation.navigate('EditEvent');
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
        style={pageStyles.bottomFAB}
      />
    ),
    [isTopEdge, handleEditInfo]
  );

  // clear global state on unmount
  //
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0} style={styles.screenPadding}>
        <EventDetail event={event} />
      </ScrollView>
      {!isEditForbidden && bottomActions}
    </Screen>
  );
};
