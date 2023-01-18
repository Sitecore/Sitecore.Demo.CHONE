import { FetchOptions } from "../..";
import { getAllAthletes } from "../getAthletes";
import { getAllEvents } from "../getEvents";
import { getAllSports } from "../getSports";

// If athletes, events and sports reponses are valid, return true for valid connection
// Else return false for invalid connection
//
export const validateConnection = async (
  options: FetchOptions
): Promise<boolean> => {
  const promises = [
    getAllAthletes(options),
    getAllEvents(options),
    getAllSports(options),
  ];

  return await Promise.all(promises).then(([athletes, events, sports]) => {
    if (athletes?.length && events?.length && sports?.length) {
      return true;
    }

    throw "Invalid connection";
  });
};
