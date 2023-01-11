import { View } from "react-native";
import { InputText } from "../../components/InputText/InputText";
import { theme } from "../../theme/theme";
import { inputContainerStyle } from "./styles";

export const RichTextView = () => {
  return (
    <View>
      <InputText
        containerStyle={inputContainerStyle}
        label="Summary"
        multiline
      />
      <InputText containerStyle={inputContainerStyle} label="Body" multiline />
    </View>
  );
};
