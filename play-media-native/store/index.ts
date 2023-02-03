import { configureStore } from "@reduxjs/toolkit";
import athletesReducer from "./athletes";
import connectionsReducer from "./connections";
import eventFieldsReducer from "./eventFields";
import eventsReducer from "./events";
import mediaReducer from "./media";
import filtersReducer from "./filters";
import tempMediaReducer from "./tempMedia";

export const store = configureStore({
  reducer: {
    athletes: athletesReducer,
    connections: connectionsReducer,
    eventFields: eventFieldsReducer,
    events: eventsReducer,
    media: mediaReducer,
    filters: filtersReducer,
    tempMedia: tempMediaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
