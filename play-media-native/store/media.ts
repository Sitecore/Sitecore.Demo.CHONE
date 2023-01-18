import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../interfaces/media";

export interface MediaState {
  media: Media[];
  temp: Partial<Media>;
}

const initialState: MediaState = {
  media: [],
  temp: null,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    add: (state: MediaState, action: PayloadAction<Media[]>) => {
      const existingNames = state.media.map((item) => item.name);
      const nonDuplicates = action.payload.filter(
        (item) => !existingNames.includes(item.name)
      );

      state.media = [...state.media, ...nonDuplicates];
    },
    clear: (state: MediaState) => {
      state.media = [];
    },
    clearTemp: (state: MediaState) => {
      state.temp = null;
    },
    editTemp: (state: MediaState, action: PayloadAction<Partial<Media>>) => {
      state.temp = state.temp
        ? { ...state.temp, ...action.payload }
        : action.payload;
    },
    remove: (state: MediaState, action: PayloadAction<Media[]>) => {
      const IDsToBeRemoved = action.payload.map((item) => item.id);

      state.media = state.media.filter(
        (item) => !IDsToBeRemoved.includes(item.id)
      );
    },
  },
});

export const { add, clear, clearTemp, editTemp, remove } = mediaSlice.actions;

export default mediaSlice.reducer;
