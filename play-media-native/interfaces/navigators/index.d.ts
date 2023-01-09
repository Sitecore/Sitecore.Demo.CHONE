import type { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  AddAthlete: undefined;
  AddConnection: undefined;
  AddEvent: undefined;
  AthleteDetail: { id: string };
  EventDetail: { id: string };
  MainTabs: undefined;
  RemoveConnection: undefined;
  SelectConnection: undefined;
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
};

// Navigation prop for components in TabHeader
//
export type TabHeaderNavigationProp = StackNavigationProp<RootStackParamList>;
