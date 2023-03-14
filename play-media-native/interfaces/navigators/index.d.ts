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
  EditAthlete: { id: string; stateKey: string };
  EditEvent: { id: string; stateKey: string };
  EditMedia: undefined;
  MediaDetail: { id: string };
  EventDetail: { id: string };
  MainTabs: undefined;
  ManualConnection: undefined;
  QRCodeConnection: undefined;
  RemoveConnection: undefined;
  ReviewAthlete: {
    isNew: boolean;
    stateKey: string;
    title: string;
  };
  ReviewEvent: {
    isNew: boolean;
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
