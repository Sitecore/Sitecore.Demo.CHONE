import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { createContentItem, updateContentItem } from '../api/queries/contentItems';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { EventDetail } from '../features/EventDetail/EventDetail';
import { Screen } from '../features/Screen/Screen';
import { mapContentItem } from '../helpers/contentItemHelper';
import { prepareRequestFields } from '../helpers/events';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
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
  const isNew = route?.params?.isNew;

  const { contentItems } = useContentItems();
  const event = contentItems[stateKey] as Event;

  const [newEventID, setNewEventID] = useState(undefined);

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: `Review ${event?.title}`,
    });
  }, [event, navigation]);

  // Hide bottom action buttons if a loading indicator or a toaster is shown
  useEffect(() => {
    if (isValidating || showSuccessToast || showErrorToast) {
      setShouldShowBottomActions(false);
    } else {
      setShouldShowBottomActions(true);
    }
  }, [isValidating, showSuccessToast, showErrorToast]);

  const processResponse = useCallback((res: { id: string; name: string }) => {
    setNewEventID(res.id);
    setShowSuccessToast(true);
  }, []);

  const handleSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
    navigation.navigate('MainTabs', {
      id: newEventID,
    });
  }, [navigation, newEventID]);

  const handleErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  const handleDraft = useCallback(() => {
    // TODO draft case
  }, []);

  const handleSubmitBtn = useCallback(async () => {
    setIsValidating(true);

    //  Map eventToReview object to a form suitable for the API request
    const requestFields = mapContentItem(prepareRequestFields(event), (k, v) => ({
      value: v?.['results'] ? [...v['results'].map((obj: { id: string }) => ({ id: obj.id }))] : v,
    }));

    // Delete the id, name from the request fields to avoid errors
    delete requestFields.id;
    delete requestFields.name;

    if (isNew) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.EVENT,
        name: event.title,
        fields: requestFields,
      })
        .then((res: { id: string; name: string }) => processResponse(res))
        .catch(() => setShowErrorToast(true))
        .finally(() => setIsValidating(false));
    } else {
      await updateContentItem({
        id: event.id,
        name: event.name,
        fields: requestFields,
      })
        .then((res: { id: string; name: string }) => processResponse(res))
        .catch(() => setShowErrorToast(true))
        .finally(() => setIsValidating(false));
    }
  }, [event, isNew, processResponse]);

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
