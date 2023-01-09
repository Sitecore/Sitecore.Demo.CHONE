import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, remove, connect } from "../../store/connections";
import { Connection } from "../../interfaces/connections";

export const useConnections = () => {
  const connectionsState = useSelector((state: RootState) => state.connections);
  const dispatch = useDispatch();

  return {
    connectionsState,
    add: (connection: Connection) => dispatch(add(connection)),
    remove: (connection: Connection) => dispatch(remove(connection)),
    connect: (connection: Connection) => dispatch(connect(connection)),
  };
};
