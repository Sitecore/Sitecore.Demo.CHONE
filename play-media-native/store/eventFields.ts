import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Athlete } from "../interfaces/athlete";
import { Sport } from "../interfaces/sport";
import { Media } from "../interfaces/media";
import { Event } from "../interfaces/event";

export interface EventFieldsState {
  sport: Sport;
  featuredImage: Media;
  relatedMedia: Media[];
  athletes: Athlete[];
  relatedEvents: Event[];
}

export interface EventField {
  key: string;
  value: any;
}

const initialState: EventFieldsState = {
  sport: null,
  featuredImage: null,
  relatedMedia: [],
  athletes: [],
  relatedEvents: [],
};

export const eventFieldsSlice = createSlice({
  name: "eventFields",
  initialState,
  reducers: {
    remove: (state: EventFieldsState, action: PayloadAction<EventField>) => {
      console.log("\n\n");
      console.log("action.payload\n", action.payload);
      console.log("\n\n");

      if (!Array.isArray(action.payload.value)) {
        return {
          ...state,
          [action.payload.key]: null,
        };
      }

      const previousItems = [...state[action.payload.key]];
      const indexOfDeleted = previousItems.indexOf(action.payload.value);

      console.log("\n\n");
      console.log("indexOfDeleted\n", indexOfDeleted);
      console.log("\n\n");

      return indexOfDeleted > -1
        ? {
            ...state,
            [action.payload.key]: previousItems.splice(indexOfDeleted),
          }
        : state;
    },
    edit: (state: EventFieldsState, action: PayloadAction<EventField>) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    reset: (state: EventFieldsState) => {
      return {
        sport: null,
        featuredImage: null,
        relatedMedia: [],
        athletes: [],
        relatedEvents: [],
      };
    },
  },
});

export const { edit, remove, reset } = eventFieldsSlice.actions;

export default eventFieldsSlice.reducer;
