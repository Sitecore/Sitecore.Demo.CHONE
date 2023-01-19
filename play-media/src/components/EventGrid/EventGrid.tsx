import { useCallback, useMemo, useState } from 'react';
import { getInitialData, mockFetchData } from '../../helpers/mockPagination';
import { Event } from '../../interfaces/event';
import { InfiniteScroll } from '../Common/InfiniteScroll';
import { EventCard } from './EventCard';

export const EventGrid = ({ events }: { events: Event[] }) => {
  const initialEvents = useMemo(() => getInitialData(events), [events]);
  const [displayedEvents, setDisplayedEvents] = useState(initialEvents);

  const fetchData = useCallback(
    () => mockFetchData(events, displayedEvents, setDisplayedEvents),
    [displayedEvents, events]
  );

  if (!events) {
    return null;
  }

  return (
    <InfiniteScroll
      dataLength={displayedEvents.length}
      fetchData={fetchData}
      hasMore={displayedEvents.length < events.length}
    >
      <section className="event-grid">
        {!!displayedEvents?.length &&
          displayedEvents?.map((event) => <EventCard key={event.id} event={event} />)}
      </section>
    </InfiniteScroll>
  );
};
