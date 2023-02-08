import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../interfaces/media";

export interface TempMediaState {
  image: Media;
  key: string;
}

const initialState: TempMediaState = {
  image: null,
  key: "",
};

export const tempMediaSlice = createSlice({
  name: "tempMedia",
  initialState,
  reducers: {
    clear: (state: TempMediaState) => {
      state.image = null;
    },
    edit: (
      state: TempMediaState,
      action: PayloadAction<{ image: Media; key: string }>
    ) => {
      state = { image: action.payload.image, key: action.payload.key };
    },
  },
});

export const { clear, edit } = tempMediaSlice.actions;

export default tempMediaSlice.reducer;
