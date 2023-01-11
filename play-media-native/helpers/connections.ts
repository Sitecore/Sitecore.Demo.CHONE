import {
  CONNECTIONS_KEY,
  SELECTED_CONNECTION_KEY,
} from "../constants/connections";
import { Connection } from "../interfaces/connections";
import { getValueFor, save } from "./secureStorage";

// Check if user-provided connection name already exists
//
export const nameAlreadyExists = async (
  connection: Connection
): Promise<boolean> => {
  const existingConnections = await getConnections();
  return !!existingConnections.find(
    (item: Connection) => item.name === connection.name
  );
};

// Get all connections already stored in secure storage
//
export const getConnections = async (): Promise<Connection[] | null> => {
  const existingConnections = await getValueFor(CONNECTIONS_KEY);
  return existingConnections ? JSON.parse(existingConnections) : null;
};

// Save connection object in secure storage
//
export const storeConnection = async (
  connection: Connection
): Promise<void> => {
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

// Get selected connection
//
export const getSelectedConnection = async (): Promise<Connection | null> => {
  const selectedConnection = await getValueFor(SELECTED_CONNECTION_KEY);
  return selectedConnection ? JSON.parse(selectedConnection) : null;
};
