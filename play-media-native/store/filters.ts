import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IIndexable } from '../interfaces/indexable';

export interface FiltersState {
  visible: boolean;
  athleteFiltersActive: number;
  eventFiltersActive: number;
  athleteFilterValues: IIndexable;
  eventFilterValues: IIndexable;
}

const initialState: FiltersState = {
  visible: false,
  athleteFiltersActive: 0,
  eventFiltersActive: 0,
  athleteFilterValues: {},
  eventFilterValues: {},
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
    setAthleteFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.athleteFilterValues = action.payload;
    },
    setEventFilterValues: (state: FiltersState, action: PayloadAction<IIndexable>) => {
      state.eventFilterValues = action.payload;
    },
  },
});

export const {
  toggleVisible,
  setAthleteFiltersActive,
  setEventFiltersActive,
  setAthleteFilterValues,
  setEventFilterValues,
} = filtersSlice.actions;

export default filtersSlice.reducer;
