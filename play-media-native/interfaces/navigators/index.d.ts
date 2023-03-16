// https://reactnavigation.org/docs/typescript/

import type { StackNavigationProp as RStackNavigationProp } from '@react-navigation/stack';

type StandardScreen = {
  id?: string;
  title?: string;
  subtitle?: string;
};

export type RootStackParamList = {
  AddAthletes: StandardScreen & {
    shouldShowSearchIcon: boolean;
  };
  AddConnection: StandardScreen;
  AddEvents: StandardScreen & {
    shouldShowSearchIcon: boolean;
  };
  AddCH1Media: StandardScreen & {
    shouldShowSearchIcon: boolean;
  };
  AddSport: StandardScreen;
  AthleteDetail: StandardScreen;
  CreateAthleteOverview: StandardScreen;
  CreateAthleteDetailed: StandardScreen & {
    stateKey: string;
  };
  CreateEventOverview: StandardScreen;
  CreateEventDetailed: StandardScreen & {
    stateKey: string;
  };
  DiscardChanges: StandardScreen & {
    message: string;
    redirectRoute: string;
    stateKey: string;
  };
  EditAthlete: StandardScreen & {
    stateKey: string;
  };
  EditEvent: StandardScreen & {
    stateKey: string;
  };
  EditMedia: StandardScreen;
  EventDetail: StandardScreen;
  MainTabs: undefined;
  ManualConnection: StandardScreen;
  MediaDetail: StandardScreen;
  QRCodeConnection: undefined;
  RemoveConnection: undefined;
  ReviewAthlete: StandardScreen & {
    isNew: boolean;
    stateKey: string;
  };
  ReviewEvent: StandardScreen & {
    isNew: boolean;
    stateKey: string;
  };
  SelectConnection: StandardScreen & {
    shouldShowBackBtn?: boolean;
  };
};

export type RootTabParamList = {
  Events: undefined;
  Athletes: undefined;
  Media: undefined;
};

// Navigation prop Stack navigator
//
export type StackNavigationProp = RStackNavigationProp<RootStackParamList>;
