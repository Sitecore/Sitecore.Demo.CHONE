// https://reactnavigation.org/docs/typescript/

import type { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  AddAthlete: undefined;
  AddConnection: undefined;
  AddEvent: undefined;
  AddCH1Media: undefined;
  AddMedia: undefined;
  AthleteDetail: { id: string };
  EditAthleteDetails: { id: string };
  Camera: undefined;
  EditMedia: undefined;
  EventDetail: { id: string };
  MainTabs: undefined;
  RemoveConnection: undefined;
  SelectConnection: undefined;
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
};

// Navigation prop Stack navigator
//
export type StackNavigationProp = StackNavigationProp<RootStackParamList>;
