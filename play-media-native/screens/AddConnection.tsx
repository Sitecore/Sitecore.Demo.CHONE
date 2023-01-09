import { SafeAreaView, StatusBar, View } from "react-native";
import { Logo } from "../components/Logo/Logo";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { useCallback } from "react";

export const AddConnectionScreen = ({ navigation }) => {
  const onAddSuccess = useCallback(
    () =>
      setTimeout(() => {
        navigation.navigate("SelectConnection");
      }, 1000),
    [navigation]
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
      <FormAddConnection onSuccess={onAddSuccess} />
    </SafeAreaView>
  );
};
