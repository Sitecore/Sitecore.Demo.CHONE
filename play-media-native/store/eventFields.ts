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

export const { edit, reset } = eventFieldsSlice.actions;

export default eventFieldsSlice.reducer;
