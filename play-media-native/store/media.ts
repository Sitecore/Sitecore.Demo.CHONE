import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Media } from '../interfaces/media';

export interface MediaState {
  media: Media[];
}

const initialState: MediaState = {
  media: [],
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    add: (state: MediaState, action: PayloadAction<Media[]>) => {
      const existingNames = state.media.map((item) => item.name);
      const nonDuplicates = action.payload.filter((item) => !existingNames.includes(item.name));

      state.media = [...state.media, ...nonDuplicates];
    },
    clear: (state: MediaState) => {
      state.media = [];
    },
    edit: (state: MediaState, action: PayloadAction<Media>) => {
      state.media = state.media.map((item) => {
        if (action.payload.id === item.id) {
          return action.payload;
        }

        return item;
      });
    },
    remove: (state: MediaState, action: PayloadAction<Media[]>) => {
      const IDsToBeRemoved = action.payload.map((item) => item.id);

      state.media = state.media.filter((item) => !IDsToBeRemoved.includes(item.id));
    },
  },
});

export const { add, clear, edit, remove } = mediaSlice.actions;

export default mediaSlice.reducer;
