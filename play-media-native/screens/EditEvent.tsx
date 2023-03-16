import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { EDIT_EVENT_DISCARD_MESSAGE, FIELD_OVERRIDES_EVENT } from '../constants/event';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EditEvent'>;

export const EditEventScreen = ({ navigation, route }: Props) => {
  const [stateKey] = useState(route?.params?.stateKey);
  const { contentItems } = useContentItems();

  const event = (contentItems[stateKey] ?? null) as unknown as Event;
  const headerTitle = event?.name || 'Untitled event';

  const handleReview = useCallback(() => {
    navigation.navigate('ReviewEvent', {
      isNew: false,
      stateKey,
      title: headerTitle,
    });
  }, [headerTitle, navigation, stateKey]);

  const handleDiscard = useCallback(() => {
    navigation.push('DiscardChanges', {
      message: EDIT_EVENT_DISCARD_MESSAGE,
      stateKey,
      redirectRoute: 'MainTabs',
      title: headerTitle,
      subtitle: 'Discard event changes?',
    });
  }, [headerTitle, navigation, stateKey]);

  useEffect(() => {
    navigation.setParams({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        //
        e.preventDefault();

        navigation.push('DiscardChanges', {
          message: EDIT_EVENT_DISCARD_MESSAGE,
          stateKey,
          redirectRoute: 'MainTabs',
          title: headerTitle,
          subtitle: 'Discard event changes?',
        });
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [headerTitle, navigation, stateKey])
  );

  if (!event) {
    return <Text>Event not available!</Text>;
  }

  return (
    <Screen>
      <ContentItemFields
        initialRoute="EditEvent"
        overrides={FIELD_OVERRIDES_EVENT}
        stateKey={stateKey}
        headerTitle={headerTitle}
      />
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
