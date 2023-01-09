import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, connect, init, remove } from "../../store/connections";
import { Connection } from "../../interfaces/connections";

export const useConnections = () => {
  const { connections, selectedConnection } = useSelector(
    (state: RootState) => state.connections
  );
  const dispatch = useDispatch();

  return {
    connections,
    selectedConnection,
    init: (connections: Connection[]) => dispatch(init(connections)),
    add: (connection: Connection) => dispatch(add(connection)),
    remove: (connections: Connection[]) => dispatch(remove(connections)),
    connect: (connection: Connection) => dispatch(connect(connection)),
  };
};
