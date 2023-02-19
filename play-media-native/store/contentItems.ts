import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IIndexable } from '../interfaces/indexable';

export interface ContentItemsState {
  [key: string]: any;
}

export interface ContentItemField {
  id: string;
  key: string;
  value: any;
}

const initialState: ContentItemsState = {};

export const contentItemsSlice = createSlice({
  name: 'contentItems',
  initialState,
  reducers: {
    edit: (state: ContentItemsState, action: PayloadAction<ContentItemField>) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          [action.payload.key]: action.payload.value,
        },
      };
    },
    editMultiple: (
      state: ContentItemsState,
      action: PayloadAction<{ id: string; fields: IIndexable }>
    ) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload.fields,
        },
      };
    },
    init: (state: ContentItemsState, action: PayloadAction<{ id: string; fields?: any }>) => {
      if (!action.payload) {
        return { ...state };
      }

      if (!action.payload?.fields) {
        return {
          ...state,
          [action.payload.id]: {},
        };
      }

      return { ...state, [action.payload.id]: action.payload.fields };
    },
    remove: (state: ContentItemsState, action: PayloadAction<ContentItemField>) => {
      if (!Array.isArray(state[action.payload.key])) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            [action.payload.key]: null,
          },
        };
      }

      const previousItems = [...state[action.payload.id][action.payload.key]];
      const indexOfDeleted = previousItems.map((item) => item.id).indexOf(action.payload.value.id);
      previousItems.splice(indexOfDeleted, 1);

      return indexOfDeleted > -1
        ? {
            ...state,
            [action.payload.id]: {
              ...state[action.payload.id],
              [action.payload.key]: previousItems,
            },
          }
        : { ...state };
    },
    replace: (state: ContentItemsState, action: PayloadAction<ContentItemField>) => {
      if (!Array.isArray(state[action.payload.key])) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            [action.payload.key]: action.payload.value,
          },
        };
      }

      const previousItems = [...state[action.payload.id][action.payload.key]];
      const indexOfReplaced = previousItems.map((item) => item.id).indexOf(action.payload.value.id);

      if (indexOfReplaced > -1) {
        previousItems[indexOfReplaced] = action.payload.value;

        return {
          [action.payload.id]: {
            ...state[action.payload.id],
            [action.payload.key]: previousItems,
          },
        };
      }

      return { ...state };
    },
    reset: (state: ContentItemsState, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
  },
});

export const { edit, editMultiple, init, remove, replace, reset } = contentItemsSlice.actions;

export default contentItemsSlice.reducer;
