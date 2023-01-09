import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useCallback, useState } from "react";
import { useConnections } from "../hooks/useConnections/useConnections";
import { Select } from "../components/Select/Select";
import { BottomFAB } from "../components/BottomFAB/BottomFAB";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "yellow",
    color: "yellow",
  },
});

export const SelectConnectionScreen = ({ navigation }) => {
  const { connectionsState } = useConnections();
  const [showForm, setShowForm] = useState(
    !connectionsState?.connections?.length
  );

  const onFabClick = useCallback(() => {
    navigation.navigate("AddConnection");
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
          marginBottom: 20,
        }}
      >
        <Logo style={{ marginBottom: 40 }} />
        <Text style={{ color: "white", maxWidth: "80%", textAlign: "center" }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      <Select
        items={[
          { label: "one", value: "one" },
          { label: "two", value: "two" },
        ]}
        style={{ width: "90%", marginBottom: 5 }}
      />
      <Button
        icon="connection"
        mode="outlined"
        onPress={() => setShowForm(true)}
        style={{ backgroundColor: "#fff", marginTop: 10, borderRadius: 5 }}
      >
        Connect
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
