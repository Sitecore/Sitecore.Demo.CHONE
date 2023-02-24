import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IIndexable } from '../interfaces/indexable';

export interface FiltersState {
  visible: boolean;
  athleteFiltersActive: number;
  eventFiltersActive: number;
  mediaFiltersActive: number;
  athleteFilterValues: IIndexable;
  eventFilterValues: IIndexable;
  mediaFilterValues: IIndexable;
}

const initialState: FiltersState = {
  visible: false,
  athleteFiltersActive: 0,
  eventFiltersActive: 0,
  mediaFiltersActive: 0,
  athleteFilterValues: {},
  eventFilterValues: {},
  mediaFilterValues: {},
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
    },
    setEventFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.eventFilterValues = action.payload;
    },
    setMediaFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.eventFilterValues = action.payload;
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
