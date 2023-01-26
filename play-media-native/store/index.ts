import { configureStore } from "@reduxjs/toolkit";
import connectionsReducer from "./connections";
import filtersReducer from "./filters";

export const store = configureStore({
  reducer: {
    connections: connectionsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
