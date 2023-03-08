import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { createContentItem, updateContentItem } from '../api/queries/contentItems';
import { uploadMultipleImages } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { Screen } from '../features/Screen/Screen';
import {
  mapContentItem,
  mapContentItemToId,
  prepareRequestFields,
} from '../helpers/contentItemHelper';
import { getDeviceImages, insertCreatedMedia } from '../helpers/media';
import { useAthletesQuery } from '../hooks/useAthletesQuery/useAthletesQuery';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

const pageStyles = StyleSheet.create({
  title: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
  },
  body: {
    marginBottom: theme.spacing.sm,
  },
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

export const ReviewAthleteScreen = ({ navigation, route }) => {
  const stateKey = route?.params?.stateKey;
  const isNew = route?.params?.isNew;

  const { contentItems, editMultiple } = useContentItems();
  const athlete = contentItems[stateKey] as Athlete;

  const { refetch: refetchListing } = useAthletesQuery();

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

  const getRequestFields = useCallback(
    async (athleteFields: Athlete) => {
      if (!deviceMedia?.length) {
        return athleteFields;
      }

      return await uploadDeviceMedia(athleteFields);
    },
    [deviceMedia?.length, uploadDeviceMedia]
  );

  useEffect(() => {
    navigation.setOptions({
      title: `Review ${athlete?.athleteName}`,
    });
  }, [athlete, navigation]);

  // Hide bottom action buttons if a loading indicator or a toaster is shown
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

  const handleDraft = useCallback(() => {
    // TODO draft case
  }, []);

  const handleSubmitBtn = useCallback(async () => {
    setIsValidating(true);

    const stateFields = await getRequestFields(athlete);

    // Map athleteToReview object to a form suitable for the API request
    const requestFields = mapContentItem(
      prepareRequestFields(stateFields, FIELD_OVERRIDES_ATHLETE),
      mapContentItemToId
    );

    // Delete the id, name from the request fields to avoid errors
    delete requestFields.id;
    delete requestFields.name;

    if (isNew) {
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
    } else {
      await updateContentItem({
        id: athlete.id,
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
    }
  }, [athlete, getRequestFields, isNew, navigation, refetchListing]);

  const bottomActions = useMemo(
    () => (
      <BottomActions style={pageStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDraft}
        >
          Save as Draft
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleSubmitBtn}
        >
          Publish
        </Button>
      </BottomActions>
    ),
    [handleDraft, handleSubmitBtn]
  );

  if (!athlete) {
    return (
      <Screen centered>
        <Text>Athlete not available!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView scrollEventThrottle={0}>
        <AthleteDetail athlete={athlete} />
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message={isNew ? 'Athlete created successfully!' : 'Athlete updated successfully!'}
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message={isNew ? 'Athlete could not be created' : 'Athlete could not be updated'}
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </Screen>
  );
};
