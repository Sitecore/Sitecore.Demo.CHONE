import { configureStore } from '@reduxjs/toolkit';

import contentItemsReducer from './contentItems';
import filtersReducer from './filters';

export const store = configureStore({
  reducer: {
    contentItems: contentItemsReducer,
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
