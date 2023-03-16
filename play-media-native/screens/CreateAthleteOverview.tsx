import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CREATE_ATHLETE_DISCARD_MESSAGE, FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitContentItem, getInitialStateFromOverrides } from '../helpers/contentItemHelper';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventOverview'>;

export const CreateAthleteOverviewScreen = ({ navigation }: Props) => {
  const [stateKey] = useState<string>(generateID());
  const { contentItems, init, reset } = useContentItems();

  const headerTitle = contentItems[stateKey]?.athleteName || 'Untitled athlete';

  const onDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAddDetails = useCallback(() => {
    navigation.push('CreateAthleteDetailed', {
      stateKey,
      title: contentItems[stateKey]?.athleteName,
    });
  }, [contentItems, navigation, stateKey]);

  const isDisabled = !canSubmitContentItem(contentItems[stateKey], FIELD_OVERRIDES_ATHLETE);

  useEffect(() => {
    // init global state on mount
    //
    if (stateKey) {
      init({
        id: stateKey,
        fields: getInitialStateFromOverrides(FIELD_OVERRIDES_ATHLETE),
      });
    }
  }, [init, reset, stateKey]);

  useEffect(() => {
    navigation.setParams({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        // Prevent default behavior of leaving the screen
        //
        event.preventDefault();

        navigation.push('DiscardChanges', {
          message: CREATE_ATHLETE_DISCARD_MESSAGE,
          stateKey,
          redirectRoute: 'MainTabs',
          title: headerTitle,
          subtitle: 'Discard new athlete?',
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

  return (
    <KeyboardAwareScreen>
      <ContentItemFields
        initialRoute="CreateAthleteOverview"
        overrides={FIELD_OVERRIDES_ATHLETE}
        requiredOnly
        showLimited
        stateKey={stateKey}
        headerTitle={headerTitle}
      />
      <BottomActions>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View>
            <Button
              mode="outlined"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onDiscard}
            >
              Discard
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              disabled={isDisabled}
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={isDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              onPress={onAddDetails}
            >
              Add Details
            </Button>
          </View>
        </View>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
