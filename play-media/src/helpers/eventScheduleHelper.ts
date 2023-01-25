import { Event } from '../interfaces/event';
import { getDate } from './dateHelper';

export const getEventSchedule = (event: Event, shortVersion?: boolean): string => {
  return `
    ${!shortVersion ? 'Date:' : ''} ${getDate(event?.timeAndDate)}
    ${event?.location ? ` | ${!shortVersion ? 'Location:' : ''} ${event.location}` : ''}
  `;
};
