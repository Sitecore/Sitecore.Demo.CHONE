import { Athlete } from "../interfaces/athlete";
import { Event } from "../interfaces/event";
import { Sport } from "../interfaces/sport";

export const getSportOptions = (sports: Sport[]) => {
  if (!sports || !sports?.length) {
    return [];
  }

  return !!sports?.length
    ? [
        { label: "All", value: "" },
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

  return !!nationalities?.length
    ? [
        { label: "All", value: "" },
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

  const locations = Array.from(
    new Set(events?.map((event) => event.location).filter((n) => n))
  );

  return !!locations?.length
    ? [
        { label: "All", value: "" },
        ...locations.map((location) => ({
          label: location,
          value: location,
        })),
      ]
    : [];
};
