import { View } from "react-native";
import { RichTextEditor } from "../../components/RichTextEditor/RichTextEditor";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { KeyboardAwareScreen } from "../../features/Screen/KeyboardAwareScreen";
import { useState } from "react";
import { theme } from "../../theme/theme";
import { InputText } from "../../components/InputText/InputText";

const inputContainerStyle = {
  marginBottom: theme.spacing.sm,
};

export const RichTextView = ({ setBody, setTeaser, teaser }) => {
  const [rteJson, setRteJson] = useState();
  const [showError, setShowError] = useState(false);

  const handleChange = (jsonData) => {
    setShowError(!jsonData);
    setRteJson(jsonData);
    setBody(jsonData);
  };

  // const handleSubmit = () => {
  //   if (!!rteJson) {
  //     setShowError(false);
  //     // TODO: send to server/set global state
  //   } else {
  //     setShowError(true);
  //   }
  // };

  return (
    <KeyboardAwareScreen>
      <View
        style={{
          paddingHorizontal: theme.spacing.sm,
          marginTop: theme.spacing.sm,
        }}
      >
        <InputText
          onChange={setTeaser}
          containerStyle={inputContainerStyle}
          value={teaser}
          title={"Teaser"}
        />
        <RichTextEditor
          showError={showError}
          errorText={"Please enter a description."}
          onChange={handleChange}
        />
      </View>
    </KeyboardAwareScreen>
  );
};
