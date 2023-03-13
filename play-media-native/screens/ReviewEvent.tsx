import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { createContentItem, updateContentItem } from '../api/queries/contentItems';
import { uploadMultipleImages } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { FIELD_OVERRIDES_EVENT } from '../constants/event';
import { ITEM_STATUS } from '../constants/itemStatus';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { Screen } from '../features/Screen/Screen';
import {
  mapContentItem,
  mapContentItemToId,
  prepareRequestFields,
} from '../helpers/contentItemHelper';
import { publishEvent } from '../helpers/events';
import { getDeviceImages, insertCreatedMedia } from '../helpers/media';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useEventsQuery } from '../hooks/useEventsQuery/useEventsQuery';
import { Event } from '../interfaces/event';
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

export const ReviewEventScreen = ({ navigation, route }) => {
  const stateKey = route?.params?.stateKey;

  const { contentItems, editMultiple } = useContentItems();
  const event = contentItems[stateKey] as Event;

  const [eventID, setEventID] = useState(null);
  const [eventStatus, setEventStatus] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);
  const [isNew] = useState(route?.params?.isNew);

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

  const getRequestFields = useCallback(
    async (eventFields: Event) => {
      if (!deviceMedia?.length) {
        return eventFields;
      }

      return await uploadDeviceMedia(eventFields);
    },
    [deviceMedia?.length, uploadDeviceMedia]
  );

  // In case of publishing we have to manually update the event's status
  // because the server takes too long to reflect the change
  const { refetch: refetchListing } = useEventsQuery(eventID, eventStatus);

  useEffect(() => {
    navigation.setOptions({
      title: `Review ${event?.title}`,
    });
  }, [event, navigation]);

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
  const initRequestFields = useCallback(
    async (eventFields: Event) => {
      const stateFields = await getRequestFields(eventFields);

      // Map event object to a form suitable for the API request
      const requestFields = mapContentItem(
        prepareRequestFields(stateFields, FIELD_OVERRIDES_EVENT),
        mapContentItemToId
      );

      // Delete the id, name from the request fields to avoid errors
      delete requestFields.id;
      delete requestFields.name;

      return requestFields as unknown as Event;
    },
    [getRequestFields]
  );

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    const requestFields = await initRequestFields(event);

    if (isNew) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.EVENT,
        name: event.title,
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
        id: event.id,
        name: event.name,
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
  }, [event, initRequestFields, isNew, navigation, refetchListing]);

  const handlePublishBtn = useCallback(async () => {
    setIsValidating(true);

    const requestFields = await initRequestFields(event);

    if (isNew) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.EVENT,
        name: event.title,
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
      })
        .then(async (res: { id: string }) => {
          const newEvent = { ...requestFields, id: res.id };

          await publishEvent(newEvent).then(async () => {
            setEventID(newEvent.id);
            setEventStatus(ITEM_STATUS.PUBLISHED);
            setShowSuccessToast(true);

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
        id: event.id,
        name: event.name,
        fields: requestFields as unknown as { [prop: string]: { value?: unknown } },
      })
        .then(async () => {
          await publishEvent(requestFields).then(async () => {
            setEventID(event.id);
            setEventStatus(ITEM_STATUS.PUBLISHED);
            setShowSuccessToast(true);

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
  }, [event, initRequestFields, isNew, navigation, refetchListing]);

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

  if (!event) {
    return (
      <Screen centered>
        <Text>Event not available!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView scrollEventThrottle={0} style={styles.screenPadding}>
        <EventDetail event={event} isReview />
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message={isNew ? 'Event created successfully!' : 'Event updated successfully!'}
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message={isNew ? 'Event could not be created' : 'Event could not be updated'}
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </Screen>
  );
};
