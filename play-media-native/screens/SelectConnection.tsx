import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useConnections } from "../hooks/useConnections/useConnections";
import { Select } from "../components/Select/Select";
import { BottomFAB } from "../components/BottomFAB/BottomFAB";
import { Icon } from "../components/Icon/Icon";
import { getConnections } from "../helpers/connections";

const styles = StyleSheet.create({
  fabAdd: {
    bottom: 75,
  },
});

export const SelectConnectionScreen = ({ navigation }) => {
  const { connections, connect } = useConnections();

  const [yoyo, setYoyo] = useState([]);

  const [selectedConnection, setSelectedConnection] = useState();
  const noConnectionsAvailable = !connections?.length;

  const onFabAddClick = useCallback(() => {
    navigation.navigate("AddConnection");
  }, [navigation]);

  const onFabRemoveClick = useCallback(() => {
    navigation.navigate("RemoveConnection");
  }, [navigation]);

  const onSelect = useCallback((value) => {
    setSelectedConnection(value);
  }, []);

  const onConnect = useCallback(() => {
    connect(selectedConnection);
  }, []);

  const connectionOptions = useMemo(
    () =>
      Array.isArray(connections)
        ? connections.map((item) => ({
            ...item,
            label: item.name,
            value: item.name,
          }))
        : [],
    [connections]
  );

  useEffect(() => {
    const hey = async () => {
      setYoyo(await getConnections());
    };

    hey();
  }, []);

  console.log("connections", connections);
  console.log("yoyo", yoyo);

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
          marginBottom: 30,
        }}
      >
        <View>
          <Logo />
        </View>
        <Text style={{ color: "white", maxWidth: "80%", textAlign: "center" }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      {noConnectionsAvailable ? (
        <View
          style={{
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="warning-outline"
              color="yellow"
              size={25}
              style={{ marginRight: 5 }}
            />
            <Text style={{ textAlign: "center" }}>
              No connections available yet!
            </Text>
          </View>
          <Text style={{ textAlign: "center" }} variant="labelMedium">
            Add one by clicking on the + button below.
          </Text>
        </View>
      ) : (
        <>
          <Select
            items={connectionOptions}
            onChange={onSelect}
            selectedValue={selectedConnection}
            style={{ width: "90%", marginBottom: 5 }}
          />
          <Button
            icon="connection"
            mode="outlined"
            onPress={onConnect}
            style={{ marginTop: 10, borderRadius: 5 }}
          >
            Connect
          </Button>
        </>
      )}
      <Button
        icon="connection"
        mode="outlined"
        onPress={() => navigation.navigate("MainTabs")}
        style={{ marginTop: 10, borderRadius: 5 }}
      >
        Visit app (temp)
      </Button>
      <BottomFAB icon="plus" onPress={onFabAddClick} style={styles.fabAdd} />
      <BottomFAB
        disabled={noConnectionsAvailable}
        icon="delete"
        onPress={onFabRemoveClick}
      />
    </SafeAreaView>
  );
};
