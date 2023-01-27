import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { useCallback, useEffect, useMemo } from "react";
import { Button, Text } from "react-native-paper";
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
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";

export const EventDetailScreen = ({ route, navigation }) => {
  const { data: events, isFetching } = useQuery("events", () => getAllEvents());
  const event = Array.isArray(events)
    ? events.find((item) => item.id === route.params.id)
    : undefined;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  const onCardPress = useCallback((athlete: Athlete) => {
    navigation.navigate("AthleteDetail", {
      id: athlete.id,
      title: athlete.athleteName,
    });
  }, []);

  const accentColor = useMemo(
    () => getAccentColor(event.sport.results[0].title),
    [event]
  );

  const imageUriArray = useMemo(() => {
    return event.relatedMedia.results.map((img: Media) => img.fileUrl);
  }, [event]);

  const pageStyles = StyleSheet.create({
    title: {
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.gray.dark,
      marginBottom: theme.spacing.xxs,
    },
    body: {
      marginBottom: theme.spacing.sm,
    },
    button: {
      position: "absolute",
      right: -theme.spacing.sm,
      top: -theme.spacing.xs,
    },
  });

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!event) {
    return (
      <Screen centered>
        <Text>Event could not be fetched!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView style={styles.screenPadding}>
        <View>
          <Button
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={size} />
            )}
            onPress={() => {}}
            style={pageStyles.button}
          >
            Change
          </Button>
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
            {event.sport.results[0].title}
          </Text>
        </View>
        <View>
          <Button
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={size} />
            )}
            onPress={() => {}}
            style={pageStyles.button}
          >
            Edit
          </Button>
          <Text variant="labelSmall" style={pageStyles.title}>
            Title
          </Text>
          <Text style={pageStyles.body}>{event.title}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Summary
          </Text>
          <Text style={pageStyles.body}>{event.teaser}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Time and date
          </Text>
          <Text style={pageStyles.body}>
            {getDate(event.timeAndDate)} {getTime(event.timeAndDate)}
          </Text>
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
          {event.athletes.results.map((athlete: Athlete) => (
            <CardAvatar
              key={athlete.id}
              item={athlete}
              onCardPress={() => onCardPress(athlete)}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};
