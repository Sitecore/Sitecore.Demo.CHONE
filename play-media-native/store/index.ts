import { configureStore } from "@reduxjs/toolkit";
import connectionsReducer from "./connections";

export const store = configureStore({
  reducer: {
    connections: connectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
