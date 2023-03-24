import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { createContentItem } from '../api/queries/contentItems';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { CREATE_EVENT_DISCARD_MESSAGE, FIELD_OVERRIDES_EVENT } from '../constants/event';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import {
  canSubmitContentItem,
  getInitialStateFromOverrides,
  mapContentItem,
  mapContentItemToId,
  prepareRequestFields,
} from '../helpers/contentItemHelper';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useEventsQuery } from '../hooks/useEventsQuery/useEventsQuery';
import { Event } from '../interfaces/event';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventOverview'>;

export const CreateEventOverviewScreen = ({ navigation }: Props) => {
  const [stateKey] = useState<string>(generateID());
  const { contentItems, init, reset } = useContentItems();
  const event = contentItems[stateKey] as Event;

  const headerTitle = contentItems[stateKey]?.title || 'Untitled event';

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);
  const [draftSaved, setDraftSaved] = useState(false);

  const { refetch: refetchListing } = useEventsQuery();

  // Hide bottom action buttons if a loading indicator or a toaster is shown
  //
  useEffect(() => {
    if (isValidating || showSuccessToast || showErrorToast) {
      setShouldShowBottomActions(false);
    } else {
      setShouldShowBottomActions(true);
    }
  }, [isValidating, showSuccessToast, showErrorToast]);

  const handleSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
  }, []);

  const handleErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  // Map eventToReview object to a form suitable for the API request
  //
  const initRequestFields = useCallback(async (eventFields: Event) => {
    // Map event object to a form suitable for the API request
    const requestFields = mapContentItem(
      prepareRequestFields(eventFields, FIELD_OVERRIDES_EVENT),
      mapContentItemToId
    );

    // Delete the id, name from the request fields to avoid errors
    delete requestFields.id;
    delete requestFields.name;

    return requestFields;
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    const requestFields = await initRequestFields(event);

    await createContentItem({
      contentTypeId: CONTENT_TYPES.EVENT,
      name: event.title,
      fields: requestFields,
    })
      .then(async () => {
        setDraftSaved(true);
        setShowSuccessToast(true);
        await refetchListing();
        setIsValidating(false);
        navigation.navigate('MainTabs');
      })
      .catch(() => {
        setShowErrorToast(true);
        setIsValidating(false);
      });
  }, [event, initRequestFields, navigation, refetchListing]);

  const onAddDetails = useCallback(() => {
    navigation.push('CreateEventDetailed', {
      stateKey,
      title: contentItems[stateKey]?.title,
    });
  }, [contentItems, navigation, stateKey]);

  const isDisabled = !canSubmitContentItem(contentItems[stateKey], FIELD_OVERRIDES_EVENT);

  useEffect(() => {
    navigation.setParams({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  useEffect(() => {
    // init global state on mount
    //
    if (stateKey) {
      init({
        id: stateKey,
        fields: getInitialStateFromOverrides(FIELD_OVERRIDES_EVENT),
      });
    }
  }, [init, reset, stateKey]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        if (!draftSaved) {
          // Prevent default behavior of leaving the screen
          // unless automatic leave after saving draft
          //
          event.preventDefault();

          navigation.push('DiscardChanges', {
            message: CREATE_EVENT_DISCARD_MESSAGE,
            stateKey,
            redirectRoute: 'MainTabs',
            title: headerTitle,
            subtitle: 'Discard new event?',
          });
        }
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [draftSaved, headerTitle, navigation, stateKey])
  );

  const bottomActions = useMemo(
    () => (
      <BottomActions>
        <Button
          disabled={isDisabled}
          mode="outlined"
          labelStyle={[styles.buttonLabel, isDisabled && styles.buttonLabelDisabledSecondary]}
          style={[styles.button, isDisabled && styles.buttonDisabledSecondary]}
          onPress={handleSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          disabled={isDisabled}
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={onAddDetails}
        >
          Add Details
        </Button>
      </BottomActions>
    ),
    [handleSaveDraft, isDisabled, onAddDetails]
  );

  return (
    <KeyboardAwareScreen>
      <ContentItemFields
        initialRoute="CreateEventOverview"
        overrides={FIELD_OVERRIDES_EVENT}
        requiredOnly
        showLimited
        stateKey={stateKey}
        headerTitle={headerTitle}
      />

      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message="Event saved as draft successfully!"
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message="Event could not be saved as draft"
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </KeyboardAwareScreen>
  );
};
