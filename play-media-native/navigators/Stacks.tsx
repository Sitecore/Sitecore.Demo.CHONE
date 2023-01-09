import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateEventScreen } from "../screens/CreateEvent";
import { CreateAthleteScreen } from "../screens/CreateAthlete";
import { AthleteDetailScreen } from "../screens/AthleteDetail";
import { EventDetailScreen } from "../screens/EventDetail";
import { SplashScreen } from "../screens/SpashScreen";
import { Tabs } from "./Tabs";
import { useConnections } from "../hooks/useConnections/useConnections";

const Stack = createNativeStackNavigator();

export const Stacks = () => {
  const { connectionsState } = useConnections();

  return (
    <Stack.Navigator initialRouteName="MainTabs">
      {connectionsState.selectedConnection ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={Tabs}
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
        </>
      ) : (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
