import { configureStore } from "@reduxjs/toolkit";
import athletesReducer from "./athletes";
import connectionsReducer from "./connections";
import mediaReducer from "./media";
import filtersReducer from "./filters";

export const store = configureStore({
  reducer: {
    athletes: athletesReducer,
    connections: connectionsReducer,
    media: mediaReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
