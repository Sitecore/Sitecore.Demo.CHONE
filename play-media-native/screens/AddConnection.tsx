import { StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../features/FormAddConnection/FormAddConnection";
import { KeyboardAwareScreen } from "../features/Screen/KeyboardAwareScreen";
import { theme } from "../theme/theme";

const pageStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  title: {
    maxWidth: "80%",
    textAlign: "center",
  },
  chOneText: {
    fontFamily: theme.fontFamily.bold,
  },
});

export const AddConnectionScreen = () => {
  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle={"light-content"} />
      <View style={pageStyles.container}>
        <Text style={pageStyles.title}>
          Connect to a
          <Text style={pageStyles.chOneText}> Content Hub ONE </Text>
          instance via:
        </Text>
      </View>
      <FormAddConnection />
    </KeyboardAwareScreen>
  );
};
