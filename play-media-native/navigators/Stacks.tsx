import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateEventScreen } from "../screens/CreateEvent";
import { CreateAthleteScreen } from "../screens/CreateAthlete";
import { AthleteDetailScreen } from "../screens/AthleteDetail";
import { EventDetailScreen } from "../screens/EventDetail";
import { SelectConnectionScreen } from "../screens/SelectConnection";
import { Tabs } from "./Tabs";
import { useConnections } from "../hooks/useConnections/useConnections";
import { AddConnectionScreen } from "../screens/AddConnection";

const Stack = createNativeStackNavigator();

export const Stacks = () => {
  const { connectionsState } = useConnections();

  return (
    <Stack.Navigator initialRouteName="MainTabs">
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
        <Stack.Screen
          name="SelectConnection"
          component={SelectConnectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddConnection"
          component={AddConnectionScreen}
          options={{
            title: "Add Connection",
          }}
        />
      </>
    </Stack.Navigator>
  );
};
