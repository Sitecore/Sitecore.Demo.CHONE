import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { Listing } from "../components/Listing/Listing";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { Event } from "../interfaces/event";
import { StatusBar } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { defaultStyle } from "../components/BottomFAB/BottomFAB";
import { useScrollOffset } from "../hooks/useConnections/useScrollOffset";

export const EventsListingScreen = ({ navigation }) => {
  const { data: events, isFetching } = useQuery("events", getAllEvents);
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

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
        onScroll={calcScrollOffset}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Add new event"}
        extended={isTopEdge}
        onPress={() => navigation.navigate("AddEvent")}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={defaultStyle.fab}
      />
    </>
  );
};
