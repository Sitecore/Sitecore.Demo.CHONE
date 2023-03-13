import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { createContentItem, updateContentItem } from '../api/queries/contentItems';
import { uploadMultipleImages } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { ITEM_STATUS } from '../constants/itemStatus';
import { AthleteDetail } from '../features/AthleteDetail/AthleteDetail';
import { Screen } from '../features/Screen/Screen';
import { publishAthlete } from '../helpers/athletes';
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

  const { contentItems, editMultiple } = useContentItems();
  const athlete = contentItems[stateKey] as Athlete;

  const [athleteID, setAthleteID] = useState(null);
  const [athleteStatus, setAthleteStatus] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);
  const [isNew] = useState(route?.params?.isNew);

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

  // In case of publishing we have to manually update the athlete's status
  // because the server takes too long to reflect the change
  const { refetch: refetchListing } = useAthletesQuery(athleteID, athleteStatus);

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

  // Map athleteToReview object to a form suitable for the API request
  const initRequestFields = useCallback(
    async (athleteFields: Athlete) => {
      const stateFields = await getRequestFields(athleteFields);

      // Map athlete object to a form suitable for the API request
      const requestFields = mapContentItem(
        prepareRequestFields(stateFields, FIELD_OVERRIDES_ATHLETE),
        mapContentItemToId
      );

      return requestFields as unknown as Athlete;
    },
    [getRequestFields]
  );

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    const requestFields = await initRequestFields(athlete);

    if (isNew) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.ATHLETE,
        name: athlete.athleteName,
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
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
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
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
  }, [athlete, initRequestFields, isNew, navigation, refetchListing]);

  const handlePublishBtn = useCallback(async () => {
    setIsValidating(true);

    const requestFields = await initRequestFields(athlete);

    if (isNew) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.ATHLETE,
        name: athlete.athleteName,
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
      })
        .then(async (res: { id: string }) => {
          const newAthlete = { ...requestFields, id: res.id };

          await publishAthlete(newAthlete).then(async () => {
            setShowSuccessToast(true);
            setAthleteID(newAthlete.id);
            setAthleteStatus(ITEM_STATUS.PUBLISHED);

            await refetchListing();
            setIsValidating(false);
            navigation.navigate('MainTabs');
          });
        })
        .catch(() => {
          setShowErrorToast(true);
          setIsValidating(false);
        });
    } else {
      await updateContentItem({
        id: athlete.id,
        name: athlete.athleteName,
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
      })
        .then(async () => {
          await publishAthlete(requestFields).then(async () => {
            setShowSuccessToast(true);
            setAthleteID(athlete.id);
            setAthleteStatus(ITEM_STATUS.PUBLISHED);

            await refetchListing();
            setIsValidating(false);
            navigation.navigate('MainTabs');
          });
        })
        .catch(() => {
          setShowErrorToast(true);
          setIsValidating(false);
        });
    }
  }, [athlete, initRequestFields, isNew, navigation, refetchListing]);

  const bottomActions = useMemo(
    () => (
      <BottomActions style={pageStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleSaveDraft}
        >
          Save as Draft
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handlePublishBtn}
        >
          Publish
        </Button>
      </BottomActions>
    ),
    [handleSaveDraft, handlePublishBtn]
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
