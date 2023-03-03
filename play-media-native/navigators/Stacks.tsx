import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tabs } from './Tabs';
import { StackScreenHeader } from '../features/StackScreenHeader/StackScreenHeader';
import { RootStackParamList } from '../interfaces/navigators';
import { AddAthletesScreen } from '../screens/AddAthletes';
import { AddCH1MediaScreen } from '../screens/AddCH1Media/AddCH1Media';
import { AddEventsScreen } from '../screens/AddEvents';
import { AddSportsScreen } from '../screens/AddSport';
import { AthleteDetailScreen } from '../screens/AthleteDetail';
import { AddConnectionScreen } from '../screens/Connection/AddConnection';
import { ManualConnectionScreen } from '../screens/Connection/ManualConnection';
import { QRCodeConnectionScreen } from '../screens/Connection/QRCodeConnection';
import { RemoveConnectionScreen } from '../screens/Connection/RemoveConnection';
import { SelectConnectionScreen } from '../screens/Connection/SelectConnection';
import { CreateAthleteScreen } from '../screens/CreateAthlete/CreateAthlete';
import { CreateAthleteDetailedScreen } from '../screens/CreateAthleteDetailed';
import { CreateAthleteOverviewScreen } from '../screens/CreateAthleteOverview';
import { CreateEventDetailedScreen } from '../screens/CreateEventDetailed';
import { CreateEventOverviewScreen } from '../screens/CreateEventOverview';
import { DiscardChangesScreen } from '../screens/DiscardChanges';
import { EditAthleteDetailsScreen } from '../screens/EditAthleteDetails';
import { EditEventScreen } from '../screens/EditEvent';
import { EditMediaScreen } from '../screens/EditMedia';
import { EventDetailScreen } from '../screens/EventDetail';
import { ReviewAthleteScreen } from '../screens/ReviewAthlete';
import { ReviewEventScreen } from '../screens/ReviewEvent';

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
          title: 'Create a connection',
        }}
      />
      <Stack.Screen name="AddSport" component={AddSportsScreen} options={{ title: 'Add Sports' }} />
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
        name="CreateAthleteOverview"
        component={CreateAthleteOverviewScreen}
        options={{ title: 'New Athlete' }}
      />
      <Stack.Screen
        name="CreateAthleteDetailed"
        component={CreateAthleteDetailedScreen}
        options={{ title: 'New Athlete Details' }}
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
        name="DiscardChanges"
        component={DiscardChangesScreen}
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
        name="ManualConnection"
        component={ManualConnectionScreen}
        options={{
          title: 'Create a connection',
        }}
      />
      <Stack.Screen
        name="QRCodeConnection"
        component={QRCodeConnectionScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="RemoveConnection"
        component={RemoveConnectionScreen}
        options={{
          title: 'Remove Connection',
        }}
      />
      <Stack.Screen
        name="ReviewAthlete"
        component={ReviewAthleteScreen}
        options={{
          title: 'Review Athlete',
        }}
      />
      <Stack.Screen
        name="ReviewEvent"
        component={ReviewEventScreen}
        options={{
          title: 'Review Event',
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
