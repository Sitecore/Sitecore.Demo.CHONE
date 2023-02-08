import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Athlete } from "../interfaces/athlete";

export interface AthletesState {
  athletes: Athlete[];
}

const initialState: AthletesState = {
  athletes: [],
};

export const athletesSlice = createSlice({
  name: "athletes",
  initialState,
  reducers: {
    add: (state: AthletesState, action: PayloadAction<Athlete[]>) => {
      const existingIDs = state.athletes.map((item) => item.id);
      const nonDuplicates = action.payload.filter(
        (item) => !existingIDs.includes(item.id)
      );

      state.athletes = [...state.athletes, ...nonDuplicates];
    },
    clear: (state: AthletesState) => {
      state.athletes = [];
    },
    remove: (state: AthletesState, action: PayloadAction<Athlete[]>) => {
      const IDsToBeRemoved = action.payload.map((item) => item.id);

      state.athletes = state.athletes.filter(
        (item) => !IDsToBeRemoved.includes(item.id)
      );
    },
  },
});

export const { add, clear, remove } = athletesSlice.actions;

export default athletesSlice.reducer;
