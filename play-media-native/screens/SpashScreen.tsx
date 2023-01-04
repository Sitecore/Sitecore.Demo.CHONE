import { SafeAreaView } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useState } from "react";

export const SplashScreen = ({ setConnected }) => {
  const [friendlyName, setFriendlyName] = useState("");
  const [apiKey, setApiKey] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Logo />
      <TextInput
        label="User-friendly name"
        placeholder="User-friendly name"
        value={friendlyName}
        onChangeText={(text) => setFriendlyName(text)}
        style={{ margin: 10, width: "90%" }}
      />
      <TextInput
        label="API Key"
        placeholder="API Key"
        value={apiKey}
        onChangeText={(text) => setApiKey(text)}
        style={{ margin: 10, width: "90%" }}
      />
      <Button
        icon="connection"
        mode="outlined"
        onPress={() => setConnected(true)}
        style={{ backgroundColor: "#fff" }}
      >
        Connect
      </Button>
    </SafeAreaView>
  );
};
