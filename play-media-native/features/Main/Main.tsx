import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Stacks } from "../../navigators/Stacks";
import { useConnections } from "../../hooks/useConnections/useConnections";
import { getConnections } from "../../helpers/connections";

export const Main = () => {
  const { init } = useConnections();

  // Initalize global state on app load
  //
  useEffect(() => {
    const initializeConnections = async () => {
      const connections = await getConnections();
      init(connections);
    };

    initializeConnections();
  }, []);

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};
