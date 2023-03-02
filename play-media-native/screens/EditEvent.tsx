import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { EDIT_EVENT_DISCARD_MESSAGE } from '../constants/event';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const EditEventScreen = ({ navigation, route }) => {
  const [stateKey] = useState(route?.params?.stateKey);
  const { contentItems } = useContentItems();

  const event = (contentItems[stateKey] ?? null) as unknown as Event;

  const handleReview = useCallback(() => {
    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${event?.title || 'Event'}`,
    });
  }, [event, navigation, stateKey]);

  const handleDiscard = useCallback(() => {
    navigation.push('DiscardChanges', {
      message: EDIT_EVENT_DISCARD_MESSAGE,
      stateKey,
      redirectRoute: 'MainTabs',
    });
  }, [navigation, stateKey]);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || 'Edit Event',
    });
  }, [event?.title, navigation]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        // Prevent default behavior of leaving the screen
        //
        event.preventDefault();

        navigation.push('DiscardChanges', {
          message: EDIT_EVENT_DISCARD_MESSAGE,
          stateKey,
          redirectRoute: 'MainTabs',
        });
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [navigation, stateKey])
  );

  if (!event) {
    return <Text>Event not available!</Text>;
  }

  return (
    <Screen>
      <FieldsEvent initialRoute="EditEvent" stateKey={stateKey} />
      <BottomActions
        style={{
          paddingBottom: 0,
          paddingRight: theme.spacing.xs,
        }}
      >
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDiscard}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleReview}
        >
          Review
        </Button>
      </BottomActions>
    </Screen>
  );
};
