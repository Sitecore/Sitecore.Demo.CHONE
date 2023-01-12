import { configureStore } from "@reduxjs/toolkit";
import connectionsReducer from "./connections";
import mediaReducer from "./media";

export const store = configureStore({
  reducer: {
    connections: connectionsReducer,
    media: mediaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
