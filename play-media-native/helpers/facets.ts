import { Athlete } from '../interfaces/athlete';
import { Event } from '../interfaces/event';
import { IIndexable } from '../interfaces/indexable';
import { Media } from '../interfaces/media';
import { Sport } from '../interfaces/sport';

export const getSportOptions = (sports: Sport[]) => {
  if (!sports || !sports?.length) {
    return [];
  }

  return sports?.length
    ? [
        { label: 'All', value: '' },
        ...sports.map((sport) => ({
          label: sport?.title,
          value: sport?.id,
        })),
      ]
    : [];
};

export const getNationalityOptions = (athletes: Athlete[]) => {
  if (!athletes || !athletes?.length) {
    return [];
  }

  const nationalities = Array.from(
    new Set(athletes?.map((athlete) => athlete.nationality).filter((n) => n))
  );

  return nationalities?.length
    ? [
        { label: 'All', value: '' },
        ...nationalities.map((nationality) => ({
          label: nationality,
          value: nationality,
        })),
      ]
    : [];
};

export const getLocationOptions = (events: Event[]) => {
  if (!events || !events?.length) {
    return [];
  }

  const locations = Array.from(new Set(events?.map((event) => event.location).filter((n) => n)));

  return locations?.length
    ? [
        { label: 'All', value: '' },
        ...locations.map((location) => ({
          label: location,
          value: location,
        })),
      ]
    : [];
};

export const getStatusOptions = (items: Event[] | Athlete[] | Media[]) => {
  if (!items || !items?.length) {
    return [];
  }

  const statuses = Array.from(
    new Set(items?.map((item: Event | Athlete | Media) => item.status).filter((n) => n))
  );

  return statuses?.length
    ? [
        { label: 'All', value: '' },
        ...statuses.map((status) => ({
          label: status,
          value: status,
        })),
      ]
    : [];
};

export const getFileTypeOptions = (media: Media[]) => {
  if (!media || !media?.length) {
    return [];
  }

  const fileTypes = Array.from(new Set(media?.map((item) => item.fileType).filter((n) => n)));

  return fileTypes?.length
    ? [
        { label: 'All', value: '' },
        ...fileTypes.map((fileType) => ({
          label: fileType,
          value: fileType,
        })),
      ]
    : [];
};

export const getActiveSearchFacets = (activeFilters: IIndexable, activeQuery: string) => {
  const facetsActive = Object.values(activeFilters).filter((val) => !!val).length;
  const queryActive = activeQuery !== '' ? 1 : 0;

  return facetsActive + queryActive;
};
