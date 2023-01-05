import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsListingScreen } from "../screens/EventsListing";
import { TabScreenHeader } from "../components/TabScreenHeader/TabScreenHeader";
import { Image } from "react-native";
import { AthletesListingScreen } from "../screens/AthletesListing";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Events"
        component={EventsListingScreen}
        options={{
          // headerTitle: () => <Logo />,
          headerTitle: () => <TabScreenHeader />,
          headerTitleAlign: "left",
          tabBarActiveTintColor: "#b56666",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../assets/favicon.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Athletes"
        component={AthletesListingScreen}
        options={{
          // headerTitle: () => <Logo />,
          headerTitle: () => <TabScreenHeader />,
          headerTitleAlign: "left",
          tabBarActiveTintColor: "#b56666",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../assets/favicon.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
