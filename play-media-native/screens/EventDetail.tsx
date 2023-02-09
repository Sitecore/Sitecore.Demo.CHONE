import { useCallback, useEffect, useMemo } from "react";
import { AnimatedFAB, Button, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";
import { getDate, getTime } from "../helpers/dateHelper";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RichText } from "../features/RichText/RichText";
import { getAccentColor } from "../helpers/colorHelper";
import { Media } from "../interfaces/media";
import { ImageGrid } from "../features/ImageGrid/ImageGrid";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { useEventFields } from "../hooks/useEventFields/useEventFields";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { Event } from "../interfaces/event";

const pageStyles = StyleSheet.create({
  title: {
    fontFamily: theme.fontFamily.bold,
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

export const EventDetailScreen = ({ route, navigation }) => {
  const isReview = route?.params?.isReview;
  const { eventFields: event, reset } = useEventFields();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useEffect(() => {
    navigation.setOptions({
      title: event.title,
    });
  }, [event, navigation]);

  const onCardPress = useCallback(
    (athlete: Athlete) => {
      navigation.navigate("AthleteDetail", {
        id: athlete.id,
        title: athlete.athleteName,
      });
    },
    [navigation]
  );

  const handleEditInfo = useCallback(() => {
    navigation.navigate("EditEvent");
  }, [navigation]);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // TODO Add API request to create/ update athlete
  const handlePublishBtn = useCallback(() => {}, []);

  const accentColor = useMemo(
    () => getAccentColor(event?.sport?.title),
    [event]
  );

  const imageUriArray = useMemo(() => {
    return event.relatedMedia.map((img: Media) => img.fileUrl);
  }, [event]);

  const bottomActions = useMemo(
    () =>
      isReview ? (
        <BottomActions style={pageStyles.actionBtns}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleDiscardBtn}
          >
            Discard
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={() => handlePublishBtn()}
          >
            Publish
          </Button>
        </BottomActions>
      ) : (
        <AnimatedFAB
          icon={({ size }) => (
            <FontAwesomeIcon
              icon={faEdit}
              color={theme.colors.black.DEFAULT}
              size={size}
            />
          )}
          label={"Edit"}
          extended={isTopEdge}
          onPress={handleEditInfo}
          style={pageStyles.bottomFAB}
        />
      ),
    [
      event,
      isTopEdge,
      isReview,
      handleEditInfo,
      handleDiscardBtn,
      handlePublishBtn,
    ]
  );

  // clear global state on unmount
  //
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  console.log("\n\nevent Details", event.similarEvents);

  if (!event) {
    return (
      <Screen centered>
        <Text>Event not available!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        onScroll={calcScrollOffset}
        scrollEventThrottle={0}
        style={styles.screenPadding}
      >
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
          <Text variant="labelSmall" style={pageStyles.title}>
            Athletes who joined
          </Text>
          {event.athletes.map((athlete: Athlete) => (
            <CardAvatar
              key={athlete.id}
              item={athlete}
              onCardPress={() => onCardPress(athlete)}
            />
          ))}
        </View>
        {!!event?.similarEvents?.length && (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text variant="labelSmall" style={pageStyles.title}>
              Similar Events
            </Text>
            {event.similarEvents.map((event: Event) => (
              <CardEvent key={event.id} item={event} />
            ))}
          </View>
        )}
      </ScrollView>
      {bottomActions}
    </Screen>
  );
};
