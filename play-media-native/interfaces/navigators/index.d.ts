// https://reactnavigation.org/docs/typescript/

import type { StackNavigationProp as RStackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  AddAthlete: undefined;
  AddAthletes: undefined;
  AddConnection: undefined;
  AddEvent: undefined;
  AddEvents: undefined;
  AddCH1Media: undefined;
  AthleteDetail: { id: string };
  AthleteReview: { id: string };
  EditAthleteDetails: { id: string };
  EditEvent: undefined;
  EditMedia: undefined;
  EventDetail: { id: string };
  MainTabs: undefined;
  ManualConnection: undefined;
  QRCodeConnection: undefined;
  RemoveConnection: undefined;
  ReviewEvent: undefined;
  SelectConnection: undefined;
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
  Media: undefined;
};

// Navigation prop Stack navigator
//
export type StackNavigationProp = RStackNavigationProp<RootStackParamList>;
