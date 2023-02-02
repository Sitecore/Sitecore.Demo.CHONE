import { EVENT_FACETS } from "../constants/filters";
import { Event } from "../interfaces/event";
import { Sport } from "../interfaces/sport";

export const initializeEvents = (events: Event[], sports: Sport[]) => {
  if (!events || !sports) {
    return [];
  }

  return events.map((item) => ({
    ...item,
    [EVENT_FACETS.sport]: item?.sport?.results?.length
      ? item.sport.results[0]?.id
      : null,
  }));
};
