import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Connection } from "../interfaces/connections";

export interface ConnectionsState {
  connections: Connection[];
  selectedConnection: Connection | null;
}

const initialState: ConnectionsState = {
  connections: [],
  selectedConnection: null,
};

export const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Connection>) => {
      // Check if there is already a connection with same name
      //
      const matchingIndex = state.connections.findIndex(
        (connection) => connection.name === action.payload.name
      );
      const connectionAlreadyExists = matchingIndex !== -1;

      if (connectionAlreadyExists) {
        state.connections[matchingIndex] = action.payload;
      } else {
        state.connections.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<Connection>) => {
      state.connections.push(action.payload);
    },
    connect: (state, action: PayloadAction<Connection>) => {
      state.selectedConnection = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
//
export const { add, remove, connect } = connectionsSlice.actions;

export default connectionsSlice.reducer;
