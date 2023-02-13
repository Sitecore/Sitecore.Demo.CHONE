import { StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { FormAddConnection } from "../../features/FormAddConnection/FormAddConnection";
import { KeyboardAwareScreen } from "../../features/Screen/KeyboardAwareScreen";
import pageStyles from "./styles";

export const ManualConnectionScreen = () => {
  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle={"light-content"} />
      <View style={pageStyles.container}>
        <Text style={pageStyles.title}>
          Add a connection to a
          <Text style={pageStyles.chOneText}> Content Hub ONE </Text>
          instance
        </Text>
      </View>
      <FormAddConnection />
    </KeyboardAwareScreen>
  );
};
