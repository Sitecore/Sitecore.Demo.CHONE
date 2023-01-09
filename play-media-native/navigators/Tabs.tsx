import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { EventsListingScreen } from "../screens/EventsListing";
import { TabScreenHeader } from "../components/TabScreenHeader/TabScreenHeader";
import { AthletesListingScreen } from "../screens/AthletesListing";
import { theme } from "../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const tabScreenOptions: BottomTabNavigationOptions = {
    header: TabScreenHeader,
    headerBackgroundContainerStyle: {
      backgroundColor: theme.colors.black.darkest,
    },
    headerTitleAlign: "left",
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: theme.colors.black.darkest,
    },
    tabBarLabelPosition: "beside-icon",
    tabBarLabelStyle: {
      fontSize: theme.fontSize.base,
      fontFamily: theme.fontFamily.DEFAULT,
    },
    tabBarActiveTintColor: theme.colors.yellow.DEFAULT,
    tabBarActiveBackgroundColor: theme.colors.black.light,
    tabBarInactiveTintColor: theme.colors.white.DEFAULT,
    tabBarStyle: {
      backgroundColor: theme.colors.black.darkest,
      borderTopWidth: 0,
    },
  };

  return (
    <Tab.Navigator screenOptions={({ route }) => tabScreenOptions}>
      <Tab.Screen
        name="Events"
        component={EventsListingScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesomeIcon icon={faCalendarDays} color={color} size={theme.fontSize.sm} />;
          },
        }}
      />
      <Tab.Screen
        name="Athletes"
        component={AthletesListingScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesomeIcon icon={faUsers} color={color} size={theme.fontSize.sm} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
