import { SafeAreaView, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";

export const AddConnectionScreen = () => {
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
        <Text
          style={{
            color: "white",
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          Add a connection to a Content Hub One instance.
        </Text>
      </View>
      <FormAddConnection />
    </SafeAreaView>
  );
};
