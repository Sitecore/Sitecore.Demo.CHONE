import { FC } from 'react';
import { Event } from '../../interfaces/event';
import { EventCard } from './EventCard';

interface Props {
  events: Event[];
}

export const EventGridSimple: FC<Props> = ({ events }) => {
  return (
    <section className="event-grid event-grid-simple">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
};
