import { FetchOptions } from "../../../interfaces/fetchOptions";
import { generateToken } from "../generateToken";
import { getAllAthletes } from "../getAthletes";
import { getAllEvents } from "../getEvents";
import { getAllSports } from "../getSports";

// If token, athletes, events and sports reponses are valid, return true for valid connection
// Else return false for invalid connection
//
export const validateConnection = async (
  options: FetchOptions
): Promise<boolean | unknown> => {
  const promises = [
    generateToken(options),
    getAllAthletes(options),
    getAllEvents(options),
    getAllSports(options),
  ];

  return await Promise.all(promises)
    .then(() => true)
    .catch((e) => {
      throw e;
    });
};
