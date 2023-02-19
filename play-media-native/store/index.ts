import { configureStore } from '@reduxjs/toolkit';

import athleteFieldsReducer from './athleteFields';
import connectionsReducer from './connections';
import contentItemsReducer from './contentItems';
import eventFieldsReducer from './eventFields';
import filtersReducer from './filters';

export const store = configureStore({
  reducer: {
    athleteFields: athleteFieldsReducer,
    connections: connectionsReducer,
    contentItems: contentItemsReducer,
    eventFields: eventFieldsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
