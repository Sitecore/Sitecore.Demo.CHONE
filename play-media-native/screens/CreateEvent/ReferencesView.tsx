import { View } from "react-native";
import { Text } from "react-native-paper";
import { InputText } from "../../components/InputText/InputText";
import { inputContainerStyle } from "./styles";

export const ReferencesView = () => {
  return (
    <View>
      <Text>Screen 3</Text>
      <InputText containerStyle={inputContainerStyle} label="Body" multiline />
    </View>
  );
};
