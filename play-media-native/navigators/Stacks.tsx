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
import { ManualConnectionDiscardScreen } from '../screens/Connection/ManualConnectionDiscard';
import { QRCodeConnectionScreen } from '../screens/Connection/QRCodeConnection';
import { RemoveConnectionScreen } from '../screens/Connection/RemoveConnection';
import { SelectConnectionScreen } from '../screens/Connection/SelectConnection';
import { CreateAthleteDetailedScreen } from '../screens/CreateAthleteDetailed';
import { CreateAthleteOverviewScreen } from '../screens/CreateAthleteOverview';
import { CreateEventDetailedScreen } from '../screens/CreateEventDetailed';
import { CreateEventOverviewScreen } from '../screens/CreateEventOverview';
import { DiscardChangesScreen } from '../screens/DiscardChanges';
import { EditAthleteScreen } from '../screens/EditAthlete';
import { EditEventScreen } from '../screens/EditEvent';
import { EditExistingMediaScreen } from '../screens/EditExistingMedia';
import { EditMediaScreen } from '../screens/EditMedia';
import { EventDetailScreen } from '../screens/EventDetail';
import { MediaDetailScreen } from '../screens/MediaDetail';
import { ReviewAthleteScreen } from '../screens/ReviewAthlete';
import { ReviewEventScreen } from '../screens/ReviewEvent';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Stacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectConnection"
      screenOptions={{
        header: ({ route }) => <StackScreenHeader route={route} />,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="AddAthletes"
        component={AddAthletesScreen}
        initialParams={{
          subtitle: 'Add athletes',
          shouldShowSearchIcon: true,
        }}
      />
      <Stack.Screen
        name="AddEvents"
        component={AddEventsScreen}
        initialParams={{
          subtitle: 'Add related events',
          shouldShowSearchIcon: true,
        }}
      />
      <Stack.Screen
        name="AddCH1Media"
        component={AddCH1MediaScreen}
        initialParams={{
          subtitle: 'Add existing media',
          shouldShowSearchIcon: true,
        }}
      />
      <Stack.Screen
        name="AddConnection"
        component={AddConnectionScreen}
        options={{
          title: 'Create a connection',
        }}
      />
      <Stack.Screen
        name="AddSport"
        component={AddSportsScreen}
        initialParams={{
          subtitle: 'Select a sport',
        }}
      />
      <Stack.Screen
        name="AthleteDetail"
        component={AthleteDetailScreen}
        initialParams={{
          subtitle: 'Athlete details',
        }}
      />
      <Stack.Screen
        name="EditAthlete"
        component={EditAthleteScreen}
        initialParams={{
          subtitle: 'Edit athlete details',
        }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        initialParams={{
          subtitle: 'Edit event details',
        }}
      />
      <Stack.Screen
        name="CreateAthleteOverview"
        component={CreateAthleteOverviewScreen}
        initialParams={{
          title: 'Untitled athlete',
          subtitle: 'Add new athlete',
        }}
      />
      <Stack.Screen
        name="CreateAthleteDetailed"
        component={CreateAthleteDetailedScreen}
        initialParams={{
          subtitle: 'Athlete details',
        }}
      />
      <Stack.Screen
        name="CreateEventOverview"
        component={CreateEventOverviewScreen}
        initialParams={{
          title: 'Untitled event',
          subtitle: 'Add new event',
        }}
      />
      <Stack.Screen
        name="CreateEventDetailed"
        component={CreateEventDetailedScreen}
        initialParams={{
          subtitle: 'Event details',
        }}
      />
      <Stack.Screen
        name="DiscardChanges"
        component={DiscardChangesScreen}
        initialParams={{
          subtitle: 'Discard changes?',
        }}
      />
      <Stack.Screen
        name="EditExistingMedia"
        component={EditExistingMediaScreen}
        initialParams={{
          subtitle: 'Edit media file details',
        }}
      />
      <Stack.Screen
        name="EditMedia"
        component={EditMediaScreen}
        initialParams={{
          subtitle: 'Edit media file details',
        }}
      />
      <Stack.Screen
        name="MediaDetail"
        component={MediaDetailScreen}
        initialParams={{
          subtitle: 'Media file details',
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        initialParams={{
          subtitle: 'Event details',
        }}
      />
      <Stack.Screen name="MainTabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="ManualConnection" component={ManualConnectionScreen} />
      <Stack.Screen name="ManualConnectionDiscard" component={ManualConnectionDiscardScreen} />
      <Stack.Screen name="QRCodeConnection" component={QRCodeConnectionScreen} />
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
        initialParams={{
          subtitle: 'Athlete review',
        }}
      />
      <Stack.Screen
        name="ReviewEvent"
        component={ReviewEventScreen}
        initialParams={{
          subtitle: 'Event review',
        }}
      />
      <Stack.Screen
        name="SelectConnection"
        component={SelectConnectionScreen}
        initialParams={{
          title: 'Connections',
          subtitle: 'All connections',
          shouldShowBackBtn: false,
        }}
      />
    </Stack.Navigator>
  );
};
