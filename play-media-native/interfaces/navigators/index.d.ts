// https://reactnavigation.org/docs/typescript/

import type { StackNavigationProp as RStackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  AddAthlete: undefined;
  AddAthletes: undefined;
  AddConnection: undefined;
  AddEvents: undefined;
  AddCH1Media: undefined;
  AddSport: undefined;
  AthleteDetail: { id: string };
  AthleteReview: { id: string };
  CreateEventOverview: undefined;
  CreateEventDetailed: undefined;
  EditAthleteDetails: { id: string };
  EditEvent: undefined;
  EditMedia: undefined;
  EventDetail: { id: string };
  MainTabs: undefined;
  RemoveConnection: undefined;
  ReviewEvent: undefined;
  SelectConnection: undefined;
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
};

// Navigation prop Stack navigator
//
export type StackNavigationProp = RStackNavigationProp<RootStackParamList>;
