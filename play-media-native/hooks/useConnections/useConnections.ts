import { useContext } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

export const useConnections = () => {
  const { connections, selectedConnection } = useContext(ConnectionsContext);

  return {
    connections,
    selectedConnection,
  };
};
