import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getActiveSearchFacets } from '../helpers/facets';
import { IIndexable } from '../interfaces/indexable';

export interface FiltersState {
  visible: boolean;
  athleteFiltersActive: number;
  eventFiltersActive: number;
  mediaFiltersActive: number;
  athleteFilterValues: IIndexable;
  eventFilterValues: IIndexable;
  mediaFilterValues: IIndexable;
  athleteSearchQuery: string;
  eventSearchQuery: string;
  mediaSearchQuery: string;
}

const initialState: FiltersState = {
  visible: false,
  athleteFiltersActive: 0,
  eventFiltersActive: 0,
  mediaFiltersActive: 0,
  athleteFilterValues: {},
  eventFilterValues: {},
  mediaFilterValues: {},
  athleteSearchQuery: '',
  eventSearchQuery: '',
  mediaSearchQuery: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleVisible: (state: FiltersState) => {
      state.visible = !state.visible;
    },

    setAthleteFiltersActive: (state: FiltersState, action: PayloadAction<number>) => {
      state.athleteFiltersActive = action.payload;
    },
    setEventFiltersActive: (state: FiltersState, action: PayloadAction<number>) => {
      state.eventFiltersActive = action.payload;
    },
    setMediaFiltersActive: (state: FiltersState, action: PayloadAction<number>) => {
      state.mediaFiltersActive = action.payload;
    },

    setAthleteFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.athleteFilterValues = action.payload;
      state.athleteFiltersActive = getActiveSearchFacets(
        state.athleteFilterValues,
        state.athleteSearchQuery
      );
    },
    setEventFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.eventFilterValues = action.payload;
      state.eventFiltersActive = getActiveSearchFacets(
        state.eventFilterValues,
        state.eventSearchQuery
      );
    },
    setMediaFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.mediaFilterValues = action.payload;
      state.mediaFiltersActive = getActiveSearchFacets(
        state.mediaFilterValues,
        state.mediaSearchQuery
      );
    },

    setAthleteSearchQuery: (state: FiltersState, action: PayloadAction<string>) => {
      state.athleteSearchQuery = action.payload;
      state.athleteFiltersActive = getActiveSearchFacets(
        state.athleteFilterValues,
        state.athleteSearchQuery
      );
    },
    setEventSearchQuery: (state: FiltersState, action: PayloadAction<string>) => {
      state.eventSearchQuery = action.payload;
      state.eventFiltersActive = getActiveSearchFacets(
        state.eventFilterValues,
        state.eventSearchQuery
      );
    },
    setMediaSearchQuery: (state: FiltersState, action: PayloadAction<string>) => {
      state.mediaSearchQuery = action.payload;
      state.mediaFiltersActive = getActiveSearchFacets(
        state.mediaFilterValues,
        state.mediaSearchQuery
      );
    },
  },
});

export const {
  toggleVisible,
  setAthleteFiltersActive,
  setEventFiltersActive,
  setMediaFiltersActive,
  setAthleteFilterValues,
  setEventFilterValues,
  setMediaFilterValues,
  setAthleteSearchQuery,
  setEventSearchQuery,
  setMediaSearchQuery,
} = filtersSlice.actions;

export default filtersSlice.reducer;
