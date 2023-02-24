import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { TabScreenHeader } from '../features/TabScreenHeader/TabScreenHeader';
import { RootTabParamList } from '../interfaces/navigators';
import { AthletesListingScreen } from '../screens/AthletesListing';
import { EventsListingScreen } from '../screens/EventsListing';
import { MediaListingScreen } from '../screens/MediaListing';
import { theme } from '../theme/theme';

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

const styles = StyleSheet.create({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.DEFAULT,
  },
  icon: {
    marginRight: theme.spacing.xxs,
  },
});

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<'Event' | 'Athlete' | 'Media'>('Event');

  const tabScreenOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: theme.colors.yellow.DEFAULT,
    tabBarInactiveTintColor: theme.colors.white.DEFAULT,
    tabBarStyle: {
      backgroundColor: theme.colors.black.darkest,
      borderTopWidth: 0,
    },
    tabBarIndicator: () => false,
  };

  return (
    <>
      <TabScreenHeader type={activeTab} />
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={tabScreenOptions}
        screenListeners={() => ({
          state: (e: any) => {
            setActiveTab(
              e.data?.state?.index === 0
                ? 'Event'
                : e.data?.state?.index === 1
                ? 'Athlete'
                : 'Media'
            );
          },
        })}
      >
        <Tab.Screen
          name="Events"
          component={EventsListingScreen}
          options={{
            tabBarLabel: ({ color }) => {
              return (
                <View style={styles.labelContainer}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    color={color}
                    size={theme.fontSize.sm}
                    style={styles.icon}
                  />
                  <Text style={[styles.label, { color }]}>Events</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Athletes"
          component={AthletesListingScreen}
          options={{
            tabBarLabel: ({ color }) => {
              return (
                <View style={styles.labelContainer}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    color={color}
                    size={theme.fontSize.sm}
                    style={styles.icon}
                  />
                  <Text style={[styles.label, { color }]}>Athletes</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Media"
          component={MediaListingScreen}
          options={{
            tabBarLabel: ({ color }) => {
              return (
                <View style={styles.labelContainer}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    color={color}
                    size={theme.fontSize.sm}
                    style={styles.icon}
                  />
                  <Text style={[styles.label, { color }]}>Media</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
