import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Athlete } from "../interfaces/athlete";
import { Sport } from "../interfaces/sport";
import { Media } from "../interfaces/media";
import { Event } from "../interfaces/event";

export interface AthleteFieldsState {
  featuredImage: Media;
  profilePhoto: Media;
  relatedMedia: Media[];
}

export interface AthleteField {
  key: string;
  value: any;
}

const initialState: AthleteFieldsState = {
  featuredImage: null,
  profilePhoto: null,
  relatedMedia: [],
};

export const athleteFieldsSlice = createSlice({
  name: "athleteFields",
  initialState,
  reducers: {
    edit: (state: AthleteFieldsState, action: PayloadAction<AthleteField>) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    remove: (
      state: AthleteFieldsState,
      action: PayloadAction<AthleteField>
    ) => {
      if (!Array.isArray(state[action.payload.key])) {
        return {
          ...state,
          [action.payload.key]: null,
        };
      }

      const previousItems = [...state[action.payload.key]];
      const indexOfDeleted = previousItems
        .map((item) => item.id)
        .indexOf(action.payload.value.id);
      previousItems.splice(indexOfDeleted, 1);

      return indexOfDeleted > -1
        ? {
            ...state,
            [action.payload.key]: previousItems,
          }
        : { ...state };
    },
    replace: (
      state: AthleteFieldsState,
      action: PayloadAction<AthleteField>
    ) => {
      if (!Array.isArray(state[action.payload.key])) {
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      }

      const previousItems = [...state[action.payload.key]];
      const indexOfReplaced = previousItems
        .map((item) => item.id)
        .indexOf(action.payload.value.id);

      if (indexOfReplaced > -1) {
        previousItems[indexOfReplaced] = action.payload.value;

        return {
          ...state,
          [action.payload.key]: previousItems,
        };
      }

      return { ...state };
    },
    reset: (state: AthleteFieldsState) => {
      return {
        featuredImage: null,
        profilePhoto: null,
        relatedMedia: [],
      };
    },
  },
});

export const { edit, remove, replace, reset } = athleteFieldsSlice.actions;

export default athleteFieldsSlice.reducer;
