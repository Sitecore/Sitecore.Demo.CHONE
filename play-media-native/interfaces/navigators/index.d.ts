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
  CreateAthleteOverview: undefined;
  CreateAthleteDetailed: {
    stateKey: string;
    title: string;
  };
  CreateEventOverview: undefined;
  CreateEventDetailed: {
    stateKey: string;
    title: string;
  };
  DiscardChanges: {
    message: string;
    redirectRoute: string;
    stateKey: string;
  };
  EditAthleteDetails: { id: string };
  EditEvent: undefined;
  EditMedia: undefined;
  EventDetail: { id: string };
  MainTabs: undefined;
  ManualConnection: undefined;
  QRCodeConnection: undefined;
  RemoveConnection: undefined;
  ReviewAthlete: {
    stateKey: string;
    title: string;
  };
  ReviewEvent: {
    stateKey: string;
    title: string;
  };
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
