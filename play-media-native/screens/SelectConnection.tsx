import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { useConnections } from "../hooks/useConnections/useConnections";
import { Select } from "../components/Select/Select";
import { BottomFAB } from "../components/BottomFAB/BottomFAB";
import { getConnections } from "../helpers/connections";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "yellow",
    color: "yellow",
  },
});

export const SelectConnectionScreen = ({ navigation }) => {
  const [connections, setConnections] = useState([]);

  const onFabClick = useCallback(() => {
    navigation.navigate("AddConnection");
  }, [navigation]);

  useEffect(() => {
    const setConnectionsState = async () => {
      const storedConnections = await getConnections();
      const connectionOptions = Array.isArray(storedConnections)
        ? storedConnections.map((item) => ({
            ...item,
            label: item.name,
            value: item.name,
          }))
        : [];
      setConnections(connectionOptions);
    };

    setConnectionsState();
  }, [navigation]);

  console.log("connections", connections);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Logo style={{ marginBottom: 40 }} />
        <Text style={{ color: "white", maxWidth: "80%", textAlign: "center" }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      <Select items={connections} style={{ width: "90%", marginBottom: 5 }} />
      <Button
        icon="connection"
        mode="outlined"
        // onPress={() => setShowForm(true)}
        style={{ marginTop: 10, borderRadius: 5 }}
      >
        Connect
      </Button>
      <Button
        icon="connection"
        mode="outlined"
        onPress={() => navigation.navigate("MainTabs")}
        style={{ marginTop: 10, borderRadius: 5 }}
      >
        Visit app
      </Button>
      <BottomFAB
        color={styles.fab.color}
        icon="plus"
        onPress={onFabClick}
        style={styles.fab}
      />
    </SafeAreaView>
  );
};
