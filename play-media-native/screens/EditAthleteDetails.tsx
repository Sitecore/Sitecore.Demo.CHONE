import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { EDIT_ATHLETE_DISCARD_MESSAGE, FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const EditAthleteDetailsScreen = ({ navigation, route }) => {
  const [stateKey] = useState(route?.params?.stateKey);
  const { contentItems } = useContentItems();

  const athlete = (contentItems[stateKey] ?? null) as unknown as Athlete;

  const handleReview = useCallback(() => {
    navigation.navigate('ReviewAthlete', {
      stateKey,
      title: `Review ${athlete?.athleteName || 'Athlete'}`,
    });
  }, [athlete?.athleteName, navigation, stateKey]);

  const handleDiscard = useCallback(() => {
    navigation.push('DiscardChanges', {
      message: EDIT_ATHLETE_DISCARD_MESSAGE,
      stateKey,
      redirectRoute: 'MainTabs',
    });
  }, [navigation, stateKey]);

  useEffect(() => {
    navigation.setOptions({
      title: athlete?.athleteName || 'Edit Athlete',
    });
  }, [athlete?.athleteName, navigation]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        // Prevent default behavior of leaving the screen
        //
        event.preventDefault();

        navigation.push('DiscardChanges', {
          message: EDIT_ATHLETE_DISCARD_MESSAGE,
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

  return (
    <Screen>
      <ContentItemFields
        initialRoute="EditAthlete"
        overrides={FIELD_OVERRIDES_ATHLETE}
        stateKey={stateKey}
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
