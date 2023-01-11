import { View } from "react-native";
import { InputText } from "../../components/InputText/InputText";
import { theme } from "../../theme/theme";
import { inputContainerStyle } from "./styles";

export const FieldsView = () => {
  return (
    <View>
      <InputText containerStyle={inputContainerStyle} label="Title" multiline />
      <InputText
        containerStyle={inputContainerStyle}
        label="Time and Date"
        multiline
      />
      <InputText
        containerStyle={inputContainerStyle}
        label="Location"
        multiline
      />
    </View>
  );
};
