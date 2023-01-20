import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { ImageOverlayCarousel } from "../features/ImageOverlayCarousel/ImageOverlayCarousel";
import { Media } from "../interfaces/media";
import { ImageGrid } from "../features/ImageGrid/ImageGrid";

export const EventDetailScreen = ({ route, navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);
  const event = Array.isArray(events)
    ? events.find((item) => item.id === route.params.id)
    : undefined;

  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

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

  const onOverlayClose = useCallback(() => {
    setOverlayVisible(false);
  }, []);

  const onImagePress = useCallback((i: number) => {
    setCarouselStartIndex(i);
    setOverlayVisible(true);
  }, []);

  const accentColor = useMemo(
    () => getAccentColor(event.sport.results[0].title),
    [event]
  );

  const imageUriArray = useMemo(() => {
    return event.relatedMedia.results.map((img: Media) => img.fileUrl);
  }, [event]);

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
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: theme.spacing.sm,
        }}
      >
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
        <ImageGrid
          images={imageUriArray}
          onImagePress={onImagePress}
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
      <ImageOverlayCarousel
        images={imageUriArray}
        startIndex={carouselStartIndex}
        visible={overlayVisible}
        onClose={onOverlayClose}
      />
    </SafeAreaView>
  );
};
