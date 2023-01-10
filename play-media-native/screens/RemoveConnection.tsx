import { useCallback, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { MultiSelectChips } from "../components/MultiSelectChips/MultiSelectChips";
import { useConnections } from "../hooks/useConnections/useConnections";
import { deleteValuesFor } from "../helpers/secureStorage";

export const RemoveConnectionScreen = () => {
  const { connections, remove } = useConnections();
  const [connectionOptions, setConnectionOptions] = useState(
    connections.map((item) => ({
      ...item,
      label: item.name,
      value: item.name,
      selected: false,
    }))
  );

  const selectedCount = connectionOptions.filter(
    (item) => item.selected
  )?.length;

  const onSelect = useCallback((connection) => {
    setConnectionOptions((prevConnections) =>
      prevConnections.map((item) =>
        connection.name === item.name
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  }, []);

  const onRemove = useCallback(async () => {
    const selectedConnections = connectionOptions.filter(
      (connection) => connection.selected
    );

    await deleteValuesFor(selectedConnections.map((item) => item.name)).then(
      () => {
        remove(selectedConnections);
        setConnectionOptions((prevOptions) =>
          prevOptions.filter((option) => !selectedConnections.includes(option))
        );
      }
    );
  }, [connectionOptions, remove]);

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
        }}
      >
        {/* <Logo style={{ marginBottom: 40 }} /> */}
        <Text
          style={{
            color: "white",
            maxWidth: "80%",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Select connection(s) to be removed.
        </Text>
        <MultiSelectChips items={connectionOptions} onSelect={onSelect} />
        <Button
          disabled={selectedCount === 0}
          icon="delete"
          mode="contained"
          onPress={onRemove}
          style={{ marginTop: 50 }}
        >
          <Text>{`Remove ${selectedCount || ""}`}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
