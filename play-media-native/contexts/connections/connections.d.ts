import { Connection } from "../../interfaces/connections";

export interface ConnectionsState {
  connections: Connection[];
  selectedConnection: string;
}
