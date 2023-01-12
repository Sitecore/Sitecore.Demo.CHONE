import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../interfaces/media";

export interface MediaState {
  media: Media[];
}

const initialState: MediaState = {
  media: [],
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    add: (state: MediaState, action: PayloadAction<Media[]>) => {
      state.media = [...state.media, ...action.payload];
    },
    clear: (state: MediaState) => {
      state.media = [];
    },
    remove: (state: MediaState, action: PayloadAction<Media[]>) => {
      const IDsToBeRemoved = action.payload.map((item) => item.id);

      state.media = state.media.filter(
        (item) => !IDsToBeRemoved.includes(item.id)
      );
    },
  },
});

export const { add, clear, remove } = mediaSlice.actions;

export default mediaSlice.reducer;
