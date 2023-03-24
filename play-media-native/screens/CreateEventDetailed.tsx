import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { createContentItem } from '../api/queries/contentItems';
import { uploadMultipleImages } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { FIELD_OVERRIDES_EVENT } from '../constants/event';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import {
  canSubmitContentItem,
  mapContentItem,
  mapContentItemToId,
  prepareRequestFields,
} from '../helpers/contentItemHelper';
import { getDeviceImages, insertCreatedMedia } from '../helpers/media';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useEventsQuery } from '../hooks/useEventsQuery/useEventsQuery';
import { Event } from '../interfaces/event';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventDetailed'>;

export const CreateEventDetailedScreen = ({ navigation, route }: Props) => {
  // store stateKey in a ref so it's stable and does not require passing as route param during nav flows
  //
  const stateKeyRef = useRef({ stateKey: route?.params?.stateKey });
  const stateKey = stateKeyRef?.current?.stateKey;

  const { contentItems, editMultiple } = useContentItems();
  const event = (contentItems[stateKey] ?? null) as unknown as Event;

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  const isDisabled = !canSubmitContentItem(event, FIELD_OVERRIDES_EVENT);

  const deviceMedia = useMemo(() => getDeviceImages(event, FIELD_OVERRIDES_EVENT), [event]);

  const uploadDeviceMedia = useCallback(
    async (eventFields: Event) => {
      return await uploadMultipleImages(deviceMedia)
        .then((uploadedMedia) => {
          const updatedFields = insertCreatedMedia(eventFields, uploadedMedia);

          editMultiple({
            id: stateKey,
            fields: updatedFields,
          });

          return {
            ...eventFields,
            ...updatedFields,
          };
        })
        .catch((e) => {
          console.error(e);
          return eventFields;
        });
    },
    [deviceMedia, editMultiple, stateKey]
  );

  const getStateAfterMediaUpload = useCallback(
    async (eventFields: Event) => {
      if (!deviceMedia?.length) {
        return eventFields;
      }

      return await uploadDeviceMedia(eventFields);
    },
    [deviceMedia?.length, uploadDeviceMedia]
  );

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

    const stateFields = await getStateAfterMediaUpload(event);
    const requestFields = await initRequestFields(stateFields);

    await createContentItem({
      contentTypeId: CONTENT_TYPES.EVENT,
      name: event.title,
      fields: requestFields,
    })
      .then(async () => {
        setShowSuccessToast(true);
        await refetchListing();
        setIsValidating(false);
        navigation.navigate('MainTabs');
      })
      .catch(() => {
        setShowErrorToast(true);
        setIsValidating(false);
      });
  }, [event, getStateAfterMediaUpload, initRequestFields, navigation, refetchListing]);

  const onReview = useCallback(() => {
    navigation.navigate('ReviewEvent', {
      isNew: true,
      stateKey,
      title: event?.title,
    });
  }, [event, navigation, stateKey]);

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
          onPress={onReview}
        >
          Preview
        </Button>
      </BottomActions>
    ),
    [handleSaveDraft, isDisabled, onReview]
  );

  return (
    <KeyboardAwareScreen>
      <ContentItemFields
        initialRoute="CreateEventDetailed"
        overrides={FIELD_OVERRIDES_EVENT}
        showLimited
        stateKey={stateKey}
        headerTitle={event?.title}
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
