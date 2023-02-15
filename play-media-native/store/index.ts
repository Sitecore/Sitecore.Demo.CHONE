import { configureStore } from '@reduxjs/toolkit';

import athleteFieldsReducer from './athleteFields';
import athletesReducer from './athletes';
import connectionsReducer from './connections';
import eventFieldsReducer from './eventFields';
import eventsReducer from './events';
import filtersReducer from './filters';
import mediaReducer from './media';
import tempMediaReducer from './tempMedia';

export const store = configureStore({
  reducer: {
    athleteFields: athleteFieldsReducer,
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
