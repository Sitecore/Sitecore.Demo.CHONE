import { createContext } from "react";
import { Connection } from "../interfaces/connections";

export interface ConnectionsState {
  connections: Connection[];
  selectedConnection: string;
}

const defaultValue: ConnectionsState = {
  connections: [],
  selectedConnection: "",
};

export const ConnectionsContext = createContext(defaultValue);
