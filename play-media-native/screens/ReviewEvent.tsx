import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";
import { getDate, getTime } from "../helpers/dateHelper";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { RichText } from "../features/RichText/RichText";
import { getAccentColor } from "../helpers/colorHelper";
import { Media } from "../interfaces/media";
import { ImageGrid } from "../features/ImageGrid/ImageGrid";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { Event, EventResponse } from "../interfaces/event";
import {
  createContentItem,
  updateContentItem,
} from "../api/queries/contentItems";
import { mapContentItem } from "../helpers/contentItemHelper";
import { CONTENT_TYPES } from "../constants/contentTypes";
import { Toast } from "../components/Toast/Toast";

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
    position: "absolute",
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
  button: {
    position: "absolute",
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export const ReviewEventScreen = ({ navigation, route }) => {
  const event = route?.params?.event as Event;

  // TODO Retrieve event to review from global store
  let eventToReview = undefined as EventResponse;

  const [newEventID, setNewEventID] = useState(undefined);
  const [newEventName, setNewEventName] = useState("");

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  const isNewEvent = route.params.isNewAthlete;

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
    setNewEventName(res.name);
    setShowSuccessToast(true);
  }, []);

  const handleSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
    navigation.navigate("EventDetail", {
      id: newEventID,
      title: newEventName,
    });
  }, [newEventID, newEventName]);

  const handleErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  const handleDraft = useCallback(() => {
    // TODO draft case
  }, []);

  const handlePublishBtn = useCallback(async () => {
    setIsValidating(true);

    // Map eventToReview object to a form suitable for the API request
    const requestFields = mapContentItem(eventToReview, (k, v) => ({
      value: v?.["results"]
        ? [...v["results"].map((obj: { id: string }) => ({ id: obj.id }))]
        : v,
    }));
    // Delete the id, name from the request fields to avoid errors
    delete requestFields.id;
    delete requestFields.name;

    if (isNewEvent) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.EVENT,
        name: event.name,
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
  }, []);

  const accentColor = useMemo(
    () => getAccentColor(event?.sport?.title),
    [event]
  );

  const imageUriArray = useMemo(() => {
    return event?.relatedMedia.map((img: Media) => img.fileUrl);
  }, [event]);

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
          onPress={handlePublishBtn}
        >
          Publish
        </Button>
      </BottomActions>
    ),
    [event, handlePublishBtn]
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
        <View>
          <Text variant="labelSmall" style={pageStyles.title}>
            Sport
          </Text>
          <Text
            style={[
              pageStyles.body,
              {
                color: accentColor,
              },
            ]}
          >
            {event.sport.title || ""}
          </Text>
        </View>
        <View>
          <Text variant="labelSmall" style={pageStyles.title}>
            Title
          </Text>
          <Text style={pageStyles.body}>{event.title}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Time and date
          </Text>
          <Text style={pageStyles.body}>
            {getDate(event.timeAndDate)} {getTime(event.timeAndDate)}
          </Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Summary
          </Text>
          <Text style={pageStyles.body}>{event.teaser}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Location
          </Text>
          <Text style={pageStyles.body}>{event.location}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Body
          </Text>
          <RichText body={event.body.content} accentColor={accentColor} />
        </View>
        <ImageGrid
          images={imageUriArray}
          style={{ marginTop: theme.spacing.lg }}
        />
        <View style={{ marginTop: theme.spacing.lg }}>
          {event.athletes.map((athlete: Athlete) => (
            <CardAvatar key={athlete.id} item={athlete} />
          ))}
        </View>
        <View style={{ marginTop: theme.spacing.lg }}>
          {event.similarEvents.map((event: Event) => (
            <CardEvent key={event.id} item={event} />
          ))}
        </View>
        <View style={{ paddingBottom: 70 }} />
      </ScrollView>
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message={
          isNewEvent
            ? "Event created successfully!"
            : "Event updated successfully!"
        }
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message={
          isNewEvent
            ? "Event could not be created"
            : "Event could not be updated"
        }
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </Screen>
  );
};
