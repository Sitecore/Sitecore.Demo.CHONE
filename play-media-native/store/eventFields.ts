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
    edit: (state: EventFieldsState, action: PayloadAction<EventField>) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    remove: (state: EventFieldsState, action: PayloadAction<EventField>) => {
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
    replace: (state: EventFieldsState, action: PayloadAction<EventField>) => {
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

export const { edit, remove, replace, reset } = eventFieldsSlice.actions;

export default eventFieldsSlice.reducer;
