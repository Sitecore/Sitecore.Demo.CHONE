import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Event } from '../interfaces/event';

export interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    add: (state: EventsState, action: PayloadAction<Event[]>) => {
      const existingIDs = state.events.map((item) => item.id);
      const nonDuplicates = action.payload.filter((item) => !existingIDs.includes(item.id));

      state.events = [...state.events, ...nonDuplicates];
    },
    clear: (state: EventsState) => {
      state.events = [];
    },
    remove: (state: EventsState, action: PayloadAction<Event[]>) => {
      const IDsToBeRemoved = action.payload.map((item) => item.id);

      state.events = state.events.filter((item) => !IDsToBeRemoved.includes(item.id));
    },
  },
});

export const { add, clear, remove } = eventsSlice.actions;

export default eventsSlice.reducer;
