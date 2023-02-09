import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../interfaces/event";
import { MEDIA_SOURCES } from "../constants/media";
import { IIndexable } from "../interfaces/indexable";

const initializeEventFields = (event: Event) => {
  return {
    ...event,
    athletes: event?.athletes?.length ? event?.athletes : [],
    sport: event?.sport || null,
    featuredImage: event?.featuredImage
      ? { ...event.featuredImage, source: MEDIA_SOURCES.CH_ONE }
      : null,
    relatedMedia: event?.relatedMedia?.length
      ? event.relatedMedia.map((item) => ({
          ...item,
          source: MEDIA_SOURCES.CH_ONE,
        }))
      : [],
  };
};

export interface EventFieldsState {
  [key: string]: any;
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
  similarEvents: [],
};

export const eventFieldsSlice = createSlice({
  name: "eventFields",
  initialState,
  reducers: {
    edit: (state: EventFieldsState, action: PayloadAction<EventField>) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    editMultiple: (
      state: EventFieldsState,
      action: PayloadAction<IIndexable>
    ) => {
      return { ...state, ...action.payload };
    },
    init: (state: EventFieldsState, action: PayloadAction<Event>) => {
      if (!action.payload) {
        return { ...state };
      }

      return { ...state, ...initializeEventFields(action.payload) };
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
        similarEvents: [],
      };
    },
  },
});

export const { edit, editMultiple, init, remove, replace, reset } =
  eventFieldsSlice.actions;

export default eventFieldsSlice.reducer;
