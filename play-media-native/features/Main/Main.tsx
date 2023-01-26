import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Stacks } from "../../navigators/Stacks";
import { useConnections } from "../../hooks/useConnections/useConnections";
import { getConnections } from "../../helpers/connections";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme/styles";

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
      <SafeAreaView style={styles.screen}>
        <Stacks />
      </SafeAreaView>
    </NavigationContainer>
  );
};
