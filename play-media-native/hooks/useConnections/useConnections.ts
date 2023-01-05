import { useContext } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

export const useApiUser = () => {
  const { connections, selectedConnection } = useContext(ConnectionsContext);

  return {
    connections,
    selectedConnection,
  };
};
