import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Event } from '../../interfaces/event';
import { RootState } from '../../store';
import { add, clear, remove } from '../../store/events';

export const useEvents = () => {
  const { events } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch();

  return {
    events,
    add: useCallback((events: Event[]) => dispatch(add(events)), [dispatch]),
    clear: useCallback(() => dispatch(clear()), [dispatch]),
    remove: useCallback((events: Event[]) => dispatch(remove(events)), [dispatch]),
  };
};
