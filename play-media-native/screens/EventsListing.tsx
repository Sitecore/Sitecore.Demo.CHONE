import { useCallback } from "react";
import { QueryFunction, useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { Listing } from "../components/Listing/Listing";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { Event } from "../interfaces/event";
import { StatusBar } from "react-native";

export const EventsListingScreen = ({ navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);

  const onCardPress = useCallback((event: Event) => {
    navigation.navigate("EventDetail", {
      id: event.id,
      title: event.title,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Listing
        data={events}
        isLoading={isFetching}
        renderItem={({ item }) => (
          <CardEvent item={item} onCardPress={() => onCardPress(item)} />
        )}
      />
    </>
  );
};
