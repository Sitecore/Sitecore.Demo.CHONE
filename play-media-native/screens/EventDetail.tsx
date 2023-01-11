import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";

export const EventDetailScreen = ({ route, navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);
  const event = Array.isArray(events)
    ? events.find((item) => item.id === route.params.id)
    : undefined;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (isFetching) {
    return <Text>Loading .....</Text>;
  }

  if (!event) {
    return <Text>Event could not be fetched!</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{`Event name: ${route.params?.title}`}</Text>
    </View>
  );
};
