import { StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { KeyboardAwareScreen } from "../features/Screen/KeyboardAwareScreen";
import { theme } from "../theme/theme";

export const AddConnectionScreen = () => {
  return (
    <KeyboardAwareScreen centered>
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
    </KeyboardAwareScreen>
  );
};
