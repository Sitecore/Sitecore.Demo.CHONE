import { useQuery } from 'react-query';

import { getAllEvents } from '../../api/queries/getEvents';

export const useEventsQuery = (id = undefined, status = undefined) =>
  useQuery('events', () => getAllEvents(), {
    onSuccess: (events) => {
      // Manually update selected event's status
      if (id && status) {
        events.find((event) => event.id === id).status = status;
      }
    },
  });
