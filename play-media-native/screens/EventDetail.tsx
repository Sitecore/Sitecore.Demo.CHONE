import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";
import { getDate, getTime } from "../helpers/dateHelper";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RichText } from "../features/RichText/RichText";
import { getAccentColor } from "../helpers/colorHelper";

export const EventDetailScreen = ({ route, navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);
  const event = Array.isArray(events)
    ? events.find((item) => item.id === route.params.id)
    : undefined;

  const accentColor = getAccentColor(event.sport.results[0].title);

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

  const styles = StyleSheet.create({
    title: {
      color: theme.colors.gray.DEFAULT,
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
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.black.darkest,
        }}
      >
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.black.darkest,
        }}
      >
        <Text>Event could not be fetched!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.black.darkest,
        paddingHorizontal: theme.spacing.sm,
      }}
    >
      <ScrollView>
        <View>
          <Button
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={size} />
            )}
            onPress={() => {}}
            style={styles.button}
          >
            Change
          </Button>
          <Text variant="labelSmall" style={styles.title}>
            Sport
          </Text>
          <Text style={styles.body}>{event.sport.results[0].title}</Text>
        </View>
        <View>
          <Button
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={size} />
            )}
            onPress={() => {}}
            style={styles.button}
          >
            Edit
          </Button>
          <Text variant="labelSmall" style={styles.title}>
            Title
          </Text>
          <Text style={styles.body}>{event.title}</Text>
          <Text variant="labelSmall" style={styles.title}>
            Summary
          </Text>
          <Text style={styles.body}>{event.teaser}</Text>
          <Text variant="labelSmall" style={styles.title}>
            Time and date
          </Text>
          <Text style={styles.body}>
            {getDate(event.timeAndDate)} {getTime(event.timeAndDate)}
          </Text>
          <Text variant="labelSmall" style={styles.title}>
            Location
          </Text>
          <Text style={styles.body}>{event.location}</Text>
          <Text variant="labelSmall" style={styles.title}>
            Body
          </Text>
          <RichText body={event.body.content} accentColor={accentColor} />
        </View>
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
    </SafeAreaView>
  );
};
