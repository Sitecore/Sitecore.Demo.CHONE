import { EVENT_FACETS } from "../constants/filters";
import { Event, EventResponse } from "../interfaces/event";
import { Sport } from "../interfaces/sport";

export const initializeEvents = (events: Event[], sports: Sport[]) => {
  if (!events || !sports) {
    return [];
  }

  return events.map((item) => ({
    ...item,
    [EVENT_FACETS.sport]: item?.sport ? item.sport?.id : null,
  }));
};

// return only atheltes not already selected in global state
//
export const removeAlreadySelected = (
  events: Event[],
  existingEvents: Event[]
) => {
  const existingEventIDs = existingEvents.map((item) => item.id);
  return events.filter((event) => !existingEventIDs.includes(event.id));
};

export const normalizeEvent = (event: EventResponse) => {
  return {
    id: event.id,
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
          normalizeEvent(item as EventResponse)
        )
      : [],
  };
};
