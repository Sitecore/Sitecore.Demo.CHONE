import { CONNECTIONS_KEY } from "../constants/connections";
import { Connection } from "../interfaces/connections";
import { getValueFor, save } from "./secureStorage";

export const alreadyExists = async (connection: Connection) => {
  const existingConnections = await getConnections();
  existingConnections.find((item) => item.name === connection.name);
};

export const getConnections = async () => {
  const existingConnections = await getValueFor(CONNECTIONS_KEY);
  return existingConnections ? JSON.parse(existingConnections) : null;
};

export const storeConnection = async (connection: Connection) => {
  const existingConnections = await getConnections();

  if (!existingConnections) {
    await save(CONNECTIONS_KEY, JSON.stringify([connection]));
  } else {
    await save(
      CONNECTIONS_KEY,
      JSON.stringify([...existingConnections, connection])
    );
  }
};
