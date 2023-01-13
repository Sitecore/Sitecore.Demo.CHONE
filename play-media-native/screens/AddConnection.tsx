import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { theme } from "../theme/theme";

export const AddConnectionScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.black.darkest,
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          Add a connection to a Content Hub One instance.
        </Text>
      </View>
      <FormAddConnection />
    </KeyboardAvoidingView>
  );
};
