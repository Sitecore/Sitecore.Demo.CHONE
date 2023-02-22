import { useQuery } from 'react-query';

import { getAllEvents } from '../../api/queries/getEvents';

export const useEventsQuery = () => useQuery('events', () => getAllEvents());
