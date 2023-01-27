import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateEventScreen } from "../screens/CreateEvent/CreateEvent";
import { CreateAthleteScreen } from "../screens/CreateAthlete";
import { AthleteDetailScreen } from "../screens/AthleteDetail";
import { EventDetailScreen } from "../screens/EventDetail";
import { SelectConnectionScreen } from "../screens/SelectConnection";
import { Tabs } from "./Tabs";
import { AddConnectionScreen } from "../screens/AddConnection";
import { RootStackParamList } from "../interfaces/navigators";
import { RemoveConnectionScreen } from "../screens/RemoveConnection";
import { AddCH1MediaScreen } from "../screens/AddCH1Media/AddCH1Media";
import { AddMediaScreen } from "../screens/AddMedia/AddMedia";
import { EditMediaScreen } from "../screens/EditMedia";
import { StackScreenHeader } from "../features/StackScreenHeader/StackScreenHeader";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Stacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectConnection"
      screenOptions={{
        header: () => <StackScreenHeader />,
      }}
    >
      <Stack.Screen
        name="AddAthlete"
        component={CreateAthleteScreen}
        options={{ title: "Add Athlete" }}
      />
      <Stack.Screen
        name="AddCH1Media"
        component={AddCH1MediaScreen}
        options={{ title: "Add CH One Media" }}
      />
      <Stack.Screen
        name="AddConnection"
        component={AddConnectionScreen}
        options={{
          title: "Add Connection",
        }}
      />
      <Stack.Screen
        name="AthleteDetail"
        component={AthleteDetailScreen}
        options={{ title: "Athlete Detail" }}
      />
      <Stack.Screen
        name="AddEvent"
        component={CreateEventScreen}
        options={{ title: "Add Event" }}
      />
      <Stack.Screen
        name="AddMedia"
        component={AddMediaScreen}
        options={{ title: "Add Media" }}
      />
      <Stack.Screen
        name="EditMedia"
        component={EditMediaScreen}
        options={{ title: "Edit Media" }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: "Event Detail" }}
      />
      <Stack.Screen
        name="MainTabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RemoveConnection"
        component={RemoveConnectionScreen}
        options={{
          title: "Remove Connection",
        }}
      />
      <Stack.Screen
        name="SelectConnection"
        component={SelectConnectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
