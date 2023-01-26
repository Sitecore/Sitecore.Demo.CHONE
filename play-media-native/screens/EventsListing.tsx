import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllEvents } from "../api/queries/getEvents";
import { Listing } from "../components/Listing/Listing";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { Event } from "../interfaces/event";
import { StatusBar } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { styles } from "../theme/styles";
import { useNavigation } from "@react-navigation/native";
import { TabHeaderNavigationProp } from "../interfaces/navigators";
import { EventFilters } from "../features/EventFilters/EventFilters";
import { getAllSports } from "../api/queries/getSports";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { useFilters } from "../hooks/useFilters/useFilters";
import { camelize } from "../helpers/textHelper";
import { IIndexable } from "../interfaces/indexable";

export const EventsListingScreen = () => {
  const { data: events, isFetching: isFetchingEvents } = useQuery(
    "events",
    () => getAllEvents()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const [filteredEvents, setFilteredEvents] = useState(events);
  const { visible } = useFilters();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const navigation = useNavigation<TabHeaderNavigationProp>();

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleChange = (facetValues: IIndexable) => {
    let _filteredEvents = events;
    if (!!facetValues.eventLocation) {
      _filteredEvents = _filteredEvents.filter((event) => {
        return camelize(event.location) === facetValues.eventLocation;
      });
    }
    if (!!facetValues.eventSport) {
      _filteredEvents = _filteredEvents.filter((event) => {
        return event.sport.results[0]?.id === facetValues.eventSport;
      });
    }
    setFilteredEvents(_filteredEvents);
  };

  const onCardPress = useCallback((event: Event) => {
    navigation.navigate("EventDetail", {
      id: event.id,
      title: event.title,
    });
  }, []);

  if (isFetchingEvents || isFetchingSports) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <EventFilters
        events={events}
        sports={sports}
        onChange={handleChange}
        visible={visible}
      />
      <Listing
        data={filteredEvents}
        renderItem={({ item }) => (
          <CardEvent item={item} onCardPress={() => onCardPress(item)} />
        )}
        onScroll={calcScrollOffset}
        style={{
          flex: 1,
        }}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Add new event"}
        extended={isTopEdge}
        onPress={() => navigation.navigate("AddEvent")}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.fab}
      />
    </>
  );
};
