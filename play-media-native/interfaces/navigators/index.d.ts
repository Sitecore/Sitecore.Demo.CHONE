// https://reactnavigation.org/docs/typescript/

import type { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  AddAthlete: undefined;
  AddAthletes: undefined;
  AddConnection: undefined;
  AddEvent: undefined;
  AddEvents: undefined;
  AddCH1Media: undefined;
  AddMedia: undefined;
  AthleteDetail: { id: string };
  AthleteReview: { id: string };
  EditAthleteDetails: { id: string };
  EditEvent: undefined;
  Camera: undefined;
  EditMedia: undefined;
  EventDetail: { id: string };
  MainTabs: undefined;
  RemoveConnection: undefined;
  ReviewAthletes: undefined;
  ReviewEvent: undefined;
  SelectConnection: undefined;
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
};

// Navigation prop Stack navigator
//
export type StackNavigationProp = StackNavigationProp<RootStackParamList>;
