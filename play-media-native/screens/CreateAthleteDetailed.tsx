import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { createContentItem } from '../api/queries/contentItems';
import { uploadMultipleImages } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import {
  canSubmitContentItem,
  mapContentItem,
  mapContentItemToId,
  prepareRequestFields,
} from '../helpers/contentItemHelper';
import { getDeviceImages, insertCreatedMedia } from '../helpers/media';
import { useAthletesQuery } from '../hooks/useAthletesQuery/useAthletesQuery';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Athlete } from '../interfaces/athlete';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAthleteDetailed'>;

export const CreateAthleteDetailedScreen = ({ navigation, route }: Props) => {
  // store stateKey in a ref so it's stable and does not require passing as route param during nav flows
  //
  const stateKeyRef = useRef({ stateKey: route?.params?.stateKey });
  const stateKey = stateKeyRef?.current?.stateKey;

  const { contentItems, editMultiple } = useContentItems();
  const athlete = (contentItems[stateKey] ?? null) as unknown as Athlete;

  const isDisabled = !canSubmitContentItem(athlete, FIELD_OVERRIDES_ATHLETE);

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  const deviceMedia = useMemo(() => getDeviceImages(athlete, FIELD_OVERRIDES_ATHLETE), [athlete]);

  const uploadDeviceMedia = useCallback(
    async (athleteFields: Athlete) => {
      return await uploadMultipleImages(deviceMedia)
        .then((uploadedMedia) => {
          const updatedFields = insertCreatedMedia(athleteFields, uploadedMedia);

          editMultiple({
            id: stateKey,
            fields: updatedFields,
          });

          return {
            ...athleteFields,
            ...updatedFields,
          };
        })
        .catch((e) => {
          console.error(e);
          return athleteFields;
        });
    },
    [deviceMedia, editMultiple, stateKey]
  );

  const getStateAfterMediaUpload = useCallback(
    async (athleteFields: Athlete) => {
      if (!deviceMedia?.length) {
        return athleteFields;
      }

      return await uploadDeviceMedia(athleteFields);
    },
    [deviceMedia?.length, uploadDeviceMedia]
  );

  const { refetch: refetchListing } = useAthletesQuery();

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

  // Map athleteToReview object to a form suitable for the API request
  //
  const initRequestFields = useCallback(async (athleteFields: Athlete) => {
    // Map athlete object to a form suitable for the API request
    const requestFields = mapContentItem(
      prepareRequestFields(athleteFields, FIELD_OVERRIDES_ATHLETE),
      mapContentItemToId
    );

    // Delete the id, name from the request fields to avoid errors
    delete requestFields.id;
    delete requestFields.name;

    return requestFields;
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    const stateFields = await getStateAfterMediaUpload(athlete);
    const requestFields = await initRequestFields(stateFields);

    await createContentItem({
      contentTypeId: CONTENT_TYPES.ATHLETE,
      name: athlete.athleteName,
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
  }, [athlete, getStateAfterMediaUpload, initRequestFields, navigation, refetchListing]);

  const onReview = useCallback(() => {
    navigation.navigate('ReviewAthlete', {
      isNew: true,
      stateKey,
      title: athlete?.athleteName,
    });
  }, [athlete, navigation, stateKey]);

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
        initialRoute="CreateAthleteDetailed"
        overrides={FIELD_OVERRIDES_ATHLETE}
        showLimited
        stateKey={stateKey}
        headerTitle={athlete?.athleteName}
      />
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message="Athlete saved as draft successfully!"
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message="Athlete could not be saved as draft"
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </KeyboardAwareScreen>
  );
};
