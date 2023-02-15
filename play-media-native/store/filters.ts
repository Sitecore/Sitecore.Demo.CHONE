import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  visible: boolean;
  athleteFiltersActive: number;
  eventFiltersActive: number;
}

const initialState: FiltersState = {
  visible: false,
  athleteFiltersActive: 0,
  eventFiltersActive: 0,
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
  },
});

export const { toggleVisible, setAthleteFiltersActive, setEventFiltersActive } =
  filtersSlice.actions;

export default filtersSlice.reducer;
