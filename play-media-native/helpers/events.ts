import { EVENT_FACETS } from '../constants/filters';
import { Event, EventResponse } from '../interfaces/event';
import { Sport } from '../interfaces/sport';
import { StatusResult } from '../interfaces/statusResults';

export const initializeEvents = (events: Event[], sports: Sport[]) => {
  if (!events || !sports) {
    return [];
  }

  return events.map((item) => ({
    ...item,
    [EVENT_FACETS.sport]: item?.sport ? item.sport?.id : null,
  }));
};

// return only athletes not already selected in global state
//
export const removeAlreadySelected = (events: Event[], existingEvents: Event[]) => {
  const existingEventIDs = existingEvents.map((item) => item.id);
  return events.filter((event) => !existingEventIDs.includes(event.id));
};

export const normalizeEvent = (event: EventResponse, statusResults: StatusResult[]) => {
  const eventStatus = statusResults.find((item) => item.id === event.id)?.status;

  return {
    id: event.id,
    name: event.name,
    status: eventStatus,
    title: event.title,
    sport: event.sport?.results[0] || null,
    isFeatured: event.isFeatured,
    timeAndDate: event.timeAndDate,
    location: event.location,
    featuredImage: event.featuredImage?.results[0] || null,
    relatedMedia: event.relatedMedia?.results || [],
    teaser: event.teaser,
    body: event.body,
    athletes: event.athletes?.results || [],
    similarEvents: event.similarEvents?.results?.length
      ? event.similarEvents.results.map((item) =>
          normalizeEvent(item as EventResponse, statusResults)
        )
      : [],
  };
};

export const prepareRequestFields = (event: Event) => {
  return {
    id: event.id,
    name: event.name,
    title: event.title,
    sport: { results: event?.sport ? [event.sport] : [] },
    isFeatured: event.isFeatured,
    timeAndDate: event.timeAndDate,
    location: event.location,
    featuredImage: { results: event?.featuredImage ? [event.featuredImage] : [] },
    relatedMedia: { results: event?.relatedMedia ? [...event.relatedMedia] : [] },
    teaser: event.teaser,
    body: event.body,
    athletes: { results: event?.athletes ? [...event.athletes] : [] },
    similarEvents: { results: event?.similarEvents ? [...event.similarEvents] : [] },
  };
};
