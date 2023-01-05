import { useCallback } from "react";
import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { Listing } from "../components/Listing/Listing";
import { CardEvent } from "../components/CardEvent/CardEvent";
import { Event } from "../interfaces/event";

export const EventsListingScreen = ({ navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);

  const onCardPress = useCallback((event: Event) => {
    navigation.navigate("EventDetail", {
      id: event.id,
      title: event.title,
    });
  }, []);

  return (
    <Listing
      data={events}
      isLoading={isFetching}
      renderItem={({ item }) => (
        <CardEvent item={item} onCardPress={() => onCardPress(item)} />
      )}
    />
  );
};
