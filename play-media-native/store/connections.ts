import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Connection } from '../interfaces/connections';

export interface ConnectionsState {
  connections: Connection[];
  selectedConnection: Connection | null;
}

const initialState: ConnectionsState = {
  connections: [],
  selectedConnection: null,
};

export const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Connection>) => {
      state.connections = [...state.connections, action.payload];
    },
    connect: (state, action: PayloadAction<Connection>) => {
      state.selectedConnection = action.payload;
    },
    init: (state, action: PayloadAction<Connection[]>) => {
      state.connections = action.payload || [];
    },
    remove: (state, action: PayloadAction<Connection[]>) => {
      const namesToBeRemoved = action.payload.map((connection) => connection.name);

      state.connections = state.connections.filter(
        (connection) => !namesToBeRemoved.includes(connection.name)
      );
    },
  },
});

export const { add, connect, init, remove } = connectionsSlice.actions;

export default connectionsSlice.reducer;
