import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { useState } from "react";
import { useConnections } from "../hooks/useConnections/useConnections";
import { Select } from "../components/Select/Select";
import { BottomFAB } from "../components/BottomFAB/BottomFAB";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "yellow",
    color: "yellow",
  },
});

export const AddConnectionScreen = () => {
  const { connectionsState } = useConnections();
  const [showForm, setShowForm] = useState(
    !connectionsState?.connections?.length
  );

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
          Add a connection to a Content Hub One instance.
        </Text>
      </View>
      <FormAddConnection />
    </SafeAreaView>
  );
};
