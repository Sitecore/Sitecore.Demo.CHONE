import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tabs } from './Tabs';
import { StackScreenHeader } from '../features/StackScreenHeader/StackScreenHeader';
import { RootStackParamList } from '../interfaces/navigators';
import { AddAthletesScreen } from '../screens/AddAthletes';
import { AddCH1MediaScreen } from '../screens/AddCH1Media/AddCH1Media';
import { AddConnectionScreen } from '../screens/AddConnection';
import { AddEventsScreen } from '../screens/AddEvents';
import { AthleteDetailScreen } from '../screens/AthleteDetail';
import { CreateAthleteScreen } from '../screens/CreateAthlete/CreateAthlete';
import { CreateEventDetailedScreen } from '../screens/CreateEventDetailed';
import { CreateEventOverviewScreen } from '../screens/CreateEventOverview';
import { EditAthleteDetailsScreen } from '../screens/EditAthleteDetails';
import { EditEventScreen } from '../screens/EditEvent';
import { EditMediaScreen } from '../screens/EditMedia';
import { EventDetailScreen } from '../screens/EventDetail';
import { RemoveConnectionScreen } from '../screens/RemoveConnection';
import { ReviewEventScreen } from '../screens/ReviewEvent';
import { SelectConnectionScreen } from '../screens/SelectConnection';

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
        options={{ title: 'Add Athlete' }}
      />
      <Stack.Screen
        name="AddAthletes"
        component={AddAthletesScreen}
        options={{ title: 'Add Athletes' }}
      />
      <Stack.Screen
        name="AddEvents"
        component={AddEventsScreen}
        options={{ title: 'Add Events' }}
      />
      <Stack.Screen
        name="AddCH1Media"
        component={AddCH1MediaScreen}
        options={{ title: 'Add CH One Media' }}
      />
      <Stack.Screen
        name="AddConnection"
        component={AddConnectionScreen}
        options={{
          title: 'Add Connection',
        }}
      />
      <Stack.Screen
        name="AthleteDetail"
        component={AthleteDetailScreen}
        options={{ title: 'Athlete Detail' }}
      />
      <Stack.Screen
        name="AthleteReview"
        component={AthleteDetailScreen}
        options={{ title: 'Athlete Review' }}
      />
      <Stack.Screen
        name="EditAthleteDetails"
        component={EditAthleteDetailsScreen}
        options={{ title: 'Edit Athlete Details' }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={{ title: 'Edit Athlete Details' }}
      />
      <Stack.Screen
        name="CreateEventOverview"
        component={CreateEventOverviewScreen}
        options={{ title: 'New Event' }}
      />
      <Stack.Screen
        name="CreateEventDetailed"
        component={CreateEventDetailedScreen}
        options={{ title: 'New Event Details' }}
      />
      <Stack.Screen
        name="EditMedia"
        component={EditMediaScreen}
        options={{ title: 'Edit Media' }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Event Detail' }}
      />
      <Stack.Screen name="MainTabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="RemoveConnection"
        component={RemoveConnectionScreen}
        options={{
          title: 'Remove Connection',
        }}
      />
      <Stack.Screen
        name="ReviewEvent"
        component={ReviewEventScreen}
        options={{
          title: 'Review Events',
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
