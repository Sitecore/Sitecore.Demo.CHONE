import { useCallback, useEffect } from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Avatar, Card, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { getAllEvents } from "./api/queries/getEvents";
import { getAllAthletes } from "./api/queries/getAthletes";
import { getAllSports } from "./api/queries/getSports";
import { Athlete } from "./interfaces/athlete";
import { Event } from "./interfaces/event";
import { HeaderLogo } from "./components/HeaderLogo/HeaderLogo";
import { Listing } from "./components/Listing/Listing";
import { CardAvatar } from "./components/CardAvatar/CardAvatar";
import { CardEvent } from "./components/CardEvent/CardEvent";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventsScreen({ navigation }) {
  const { data: events, isFetching } = useQuery("events", getAllEvents);

  const onCardPress = useCallback((event: Event) => {
    navigation.navigate("EventDetail", {
      id: event.id,
      title: event.title,
    });
  }, []);

  return (
    // <View style={{ flex: 1, height: "100%" }}>
    //   {/* <Text>Events!</Text>
    //   <Button mode="outlined" onPress={() => navigation.navigate("AddEvent")}>
    //     Add event
    //   </Button> */}
    //   {events.map((event) => (
    //     <Card
    //       onPress={() => onCardPress(event)}
    //       style={{ width: "100%" }}
    //       key={event.id}
    //     >
    //       <Card.Content>
    //         <Text>{event.slug}</Text>
    //       </Card.Content>
    //     </Card>
    //   ))}
    // </View>
    <Listing
      data={events}
      isLoading={isFetching}
      renderItem={({ item }) => (
        <CardEvent item={item} onCardPress={() => onCardPress(item)} />
      )}
    />
  );
}

function AthletesScreen({ navigation }) {
  const { data: athletes, isFetching } = useQuery("athletes", getAllAthletes);

  const onCardPress = useCallback((athlete: Athlete) => {
    navigation.navigate("AthleteDetail", {
      id: athlete.id,
      title: athlete.athleteName,
    });
  }, []);

  console.log(athletes[0]);

  return (
    <Listing
      data={athletes}
      isLoading={isFetching}
      renderItem={({ item }) => (
        <CardAvatar item={item} onCardPress={() => onCardPress(item)} />
      )}
    />
  );
}

function AthleteDetailScreen({ route, navigation }) {
  const { data: athletes, isFetching } = useQuery("athletes", getAllAthletes);
  const athlete = Array.isArray(athletes)
    ? athletes.find((item) => item.id === route.params.id)
    : undefined;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (isFetching) {
    return <Text>Loading .....</Text>;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  return (
    <View>
      <Image
        source={{
          uri: athlete.featuredImage.results[0].fileUrl,
        }}
        style={{ height: 300, width: "100%" }}
      />
      <Avatar.Image
        size={100}
        source={{
          uri: athlete.profilePhoto.results[0].fileUrl,
        }}
      />
      <Text>{`Athlete name: ${athlete.athleteName}`}</Text>
      <Text>{`Athlete quote: ${athlete.athleteQuote}`}</Text>
    </View>
  );
}

function EventDetailScreen({ route, navigation }) {
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
}

function CreateEventScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Event!</Text>
    </View>
  );
}

function CreateAthleteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Athlete!</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: "left",
          tabBarActiveTintColor: "#b56666",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("./assets/favicon.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Athletes"
        component={AthletesScreen}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: "left",
          tabBarActiveTintColor: "#b56666",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("./assets/favicon.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function Main() {
  // Prepare API data
  //
  useQuery("events", getAllEvents);
  useQuery("athletes", getAllAthletes);
  useQuery("sports", getAllSports);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddEvent"
          component={CreateEventScreen}
          options={{ title: "Add Event" }}
        />
        <Stack.Screen
          name="AddAthlete"
          component={CreateAthleteScreen}
          options={{ title: "Add Athlete" }}
        />
        <Stack.Screen
          name="AthleteDetail"
          component={AthleteDetailScreen}
          options={{ title: "Athlete Detail" }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: "Event Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
