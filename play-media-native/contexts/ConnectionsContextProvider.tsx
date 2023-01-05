import { FC, PropsWithChildren, ReactNode } from "react";
import { ConnectionsContext } from "./ConnectionsContext";

interface Props {
  children: PropsWithChildren<ReactNode>;
}

export const ConnectionsProvider: FC<Props> = ({ children }) => {
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
