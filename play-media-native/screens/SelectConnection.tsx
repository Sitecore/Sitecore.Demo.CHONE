import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { useConnections } from "../hooks/useConnections/useConnections";
import { Select } from "../components/Select/Select";
import { BottomFAB } from "../components/BottomFAB/BottomFAB";
import { getConnections } from "../helpers/connections";
import { Icon } from "../components/Icon/Icon";

const styles = StyleSheet.create({
  fabAdd: {
    bottom: 75,
  },
});

export const SelectConnectionScreen = ({ navigation }) => {
  const { connect } = useConnections();
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState();

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
          marginBottom: 60,
        }}
      >
        <View>
          <Logo />
        </View>
        <Text style={{ color: "white", maxWidth: "80%", textAlign: "center" }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      {connections?.length ? (
        <>
          <Select
            items={connections}
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
      ) : (
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
      <BottomFAB icon="delete" onPress={onFabRemoveClick} />
    </SafeAreaView>
  );
};
