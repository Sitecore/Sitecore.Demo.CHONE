import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { styles } from "../theme/styles";
import { theme } from "../theme/theme";

export const AddConnectionScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.centeredScreen}
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
