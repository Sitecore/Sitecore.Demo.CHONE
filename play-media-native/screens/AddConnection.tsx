import { StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { styles } from "../theme/styles";
import { theme } from "../theme/theme";

export const AddConnectionScreen = () => {
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.colors.black.darkest }}
      contentContainerStyle={{ ...styles.screen, ...styles.centered }}
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
    </KeyboardAwareScrollView>
  );
};
