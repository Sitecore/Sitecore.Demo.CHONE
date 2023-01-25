import { FC, PropsWithChildren, ReactNode, useReducer } from "react";
import { ConnectionsContext } from "./ConnectionsContext";
import { ConnectionsState } from "./connections";
import { CONNECTION_ACTIONS } from "./constants";
import { addConnection, connect, removeConnection } from "./reducers";

interface Props {
  children: PropsWithChildren<ReactNode>;
}

const reducer = (state: ConnectionsState, action: any): ConnectionsState => {
  switch (action.type) {
    case CONNECTION_ACTIONS.ADD:
      return addConnection(state, action.payload);
    case CONNECTION_ACTIONS.REMOVE:
      return removeConnection(state, action.payload);
    case CONNECTION_ACTIONS.CONNECT:
      return connect(state, action.payload);
    default:
      throw new Error();
  }
};

const initialState = {
  notifications: [],
};

export const ConnectionsProvider: FC<Props> = ({ children }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // @ts-ignore
    <ConnectionsContext.Provider
    //   value={{
    //     connections,
    //     selectedConnection,
    //   }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
