import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Connection } from "../interfaces/connections";

export interface ConnectionsState {
  selectedConnection: Connection | null;
}

const initialState: ConnectionsState = {
  selectedConnection: null,
};

export const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<Connection>) => {
      state.selectedConnection = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
//
export const { connect } = connectionsSlice.actions;

export default connectionsSlice.reducer;
