import { getValueFor, save } from './secureStorage';
import { CONNECTIONS_KEY, SELECTED_CONNECTION_KEY } from '../constants/connections';
import { Connection } from '../interfaces/connections';

// Check if user-provided connection name already exists
//
export const nameAlreadyExists = async (connection: Connection): Promise<boolean> => {
  const existingConnections = await getConnections();
  return !!existingConnections.find((item: Connection) => item.name === connection.name);
};

// Get all connections already stored in secure storage
//
export const getConnections = async (): Promise<Connection[]> => {
  const existingConnections = await getValueFor(CONNECTIONS_KEY);
  return existingConnections ? JSON.parse(existingConnections) : [];
};

// Save connection object in secure storage
//
export const storeConnection = async (connection: Connection): Promise<void> => {
  const existingConnections = await getConnections();

  if (!existingConnections) {
    await save(CONNECTIONS_KEY, JSON.stringify([connection]));
  } else {
    await save(CONNECTIONS_KEY, JSON.stringify([...existingConnections, connection]));
  }

  await setSelectedConnection(connection);
};

// Edit selected connection in secure storage
//
export const editConnection = async (previousConnectionName: string, newConnection: Connection) => {
  const existingConnections = await getConnections();

  await save(
    CONNECTIONS_KEY,
    JSON.stringify(
      existingConnections.map((item) => {
        if (item.name !== previousConnectionName) {
          return item;
        }

        return newConnection;
      })
    )
  );
};

// Remove connection object from secure storage
//
export const removeConnection = async (connectionName: string): Promise<void> => {
  const existingConnections = await getConnections();

  if (!existingConnections?.length) {
    return;
  }

  await save(
    CONNECTIONS_KEY,
    JSON.stringify(existingConnections.filter((item) => item.name !== connectionName))
  );
};

// Get selected connection
//
export const getSelectedConnection = async (): Promise<Connection | null> => {
  const selectedConnection = await getValueFor(SELECTED_CONNECTION_KEY);
  return selectedConnection ? JSON.parse(selectedConnection) : null;
};

// Set selected connection in Expo Secure Store
export const setSelectedConnection = async (connection: Connection): Promise<void> => {
  return await save(SELECTED_CONNECTION_KEY, JSON.stringify(connection));
};
