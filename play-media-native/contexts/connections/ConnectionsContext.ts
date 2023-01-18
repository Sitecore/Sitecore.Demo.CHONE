import { createContext } from "react";
import { ConnectionsState } from "./connections";

const defaultValue: ConnectionsState = {
  connections: [],
  selectedConnection: "",
};

export const ConnectionsContext = createContext(defaultValue);
