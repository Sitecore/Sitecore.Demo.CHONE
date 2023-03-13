import { publishAthlete } from './athletes';
import { normalizeContentItem } from './contentItemHelper';
import { publishContentItem } from '../api/queries/contentItems';
import { publishMediaItem } from '../api/queries/mediaItems';
import { FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
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
    athletes: event.athletes?.results?.length
      ? event.athletes.results.map((item) => normalizeContentItem(item, FIELD_OVERRIDES_ATHLETE))
      : [],
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

// Helper function to iterate over an event and publish all related media
// (featuredImage, relatedMedia), event athletes, similar events and the event itself
export const publishEvent = async (event: Event): Promise<unknown> => {
  // If the event has a featured image and/ or related media create a promise for each one of them
  const mediaPromises = [];
  if (event?.featuredImage?.id) {
    mediaPromises.push(() => publishMediaItem(event.featuredImage.id));
  }
  if (event?.relatedMedia?.length > 0) {
    for (const mediaItem of event.relatedMedia) {
      if (mediaItem?.id) {
        mediaPromises.push(() => publishMediaItem(mediaItem.id));
      }
    }
  }

  // If the event has related athletes create a promise for each one of them
  const athletePromises = [];
  if (event?.athletes?.length > 0) {
    for (const athlete of event.athletes) {
      if (athlete?.id) {
        athletePromises.push(() => publishAthlete(athlete));
      }
    }
  }

  // If the event has similar events create a promise for each one of them
  const eventPromises = [];
  if (event?.similarEvents?.length > 0) {
    for (const similarEvent of event.similarEvents) {
      if (similarEvent?.id) {
        eventPromises.push(() => publishEvent(similarEvent));
      }
    }
  }

  // Run all of the above promises in parallel along with the one for publishing the event
  return await Promise.all([
    ...mediaPromises.map((mediaPromise) => mediaPromise()),
    ...athletePromises.map((athletePromise) => athletePromise()),
    ...eventPromises.map((eventPromise) => eventPromise()),
    publishContentItem(event.id),
  ]);
};
