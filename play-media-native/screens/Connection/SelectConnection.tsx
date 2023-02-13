import { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar, View } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useConnections } from "../../hooks/useConnections/useConnections";
import { Select } from "../../components/Select/Select";
import { BottomFAB } from "../../components/BottomFAB/BottomFAB";
import { Icon } from "../../components/Icon/Icon";
import { theme } from "../../theme/theme";
import { Screen } from "../../features/Screen/Screen";
import { styles } from "../../theme/styles";

const fabAddStyle = {
  bottom: 75,
};

export const SelectConnectionScreen = ({ navigation }) => {
  const { connections, connect } = useConnections();
  const [selectedConnection, setSelectedConnection] = useState<string>();
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
    connect(connections.find((item) => item.name === selectedConnection));
    navigation.navigate("MainTabs");
  }, [selectedConnection]);

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

  // When connections are ready, set selected connection to first connection, as default value
  //
  useEffect(() => {
    setSelectedConnection(connections[0]?.name);
  }, [connections]);

  return (
    <Screen centered>
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: theme.spacing.lg,
        }}
      >
        <View>
          <Logo />
        </View>
        <Text style={{ maxWidth: "80%", textAlign: "center" }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      {noConnectionsAvailable ? (
        <View
          style={{
            justifyContent: "center",
            marginBottom: theme.spacing.xs,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="warning-outline"
              color={theme.colors.yellow.DEFAULT}
              size={25}
              style={{ marginRight: theme.spacing.xxs }}
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
            style={{ width: "90%", marginBottom: theme.spacing.xxs }}
          />
          <Button
            icon="connection"
            mode="contained"
            onPress={onConnect}
            style={{ ...styles.button, marginTop: theme.spacing.xs }}
            labelStyle={styles.buttonLabel}
          >
            Connect
          </Button>
        </>
      )}
      <BottomFAB icon="plus" onPress={onFabAddClick} style={fabAddStyle} />
      <BottomFAB
        disabled={noConnectionsAvailable}
        icon="delete"
        onPress={onFabRemoveClick}
      />
    </Screen>
  );
};
