import { SafeAreaView } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { IconButton, TextInput } from "react-native-paper";
import { useState } from "react";

export const SplashScreen = () => {
  const [friendlyName, setFriendlyName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Logo />
      <TextInput
        label="User-friendly name"
        placeholder="User-friendly name"
        value={friendlyName}
        onChangeText={(text) => setFriendlyName(text)}
      />
      <TextInput
        label="API Key"
        placeholder="API Key"
        value={apiKey}
        onChangeText={(text) => setApiKey(text)}
      />
      <IconButton
        icon="camera"
        iconColor="red"
        size={20}
        onPress={() => setConnected(true)}
      />
    </SafeAreaView>
  );
};
