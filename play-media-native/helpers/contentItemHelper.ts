import { Athlete } from "../interfaces/athlete";
import { Event } from "../interfaces/event";
import { Sport } from "../interfaces/sport";

// Helper function to map a content item into a suitable form for the API request
export const mapContentItem = (
  obj: Partial<Event> | Partial<Athlete> | Partial<Sport>,
  fn: (key: string, value: unknown, index: number) => unknown
) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value], index) => [
      key,
      fn(key, value, index),
    ])
  );
