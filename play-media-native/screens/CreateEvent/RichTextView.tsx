import { View } from "react-native";
import { RichTextEditor } from "../../components/RichTextEditor/RichTextEditor";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { KeyboardAwareScreen } from "../../features/Screen/KeyboardAwareScreen";
import { useState } from "react";
import { theme } from "../../theme/theme";

export const RichTextView = () => {
  const [rteJson, setRteJson] = useState();
  const [showError, setShowError] = useState(false);

  const handleChange = (jsonData) => {
    setShowError(!jsonData);
    setRteJson(jsonData);
  };

  const handleSubmit = () => {
    if (!!rteJson) {
      setShowError(false);
      // TODO: send to server/set global state
      console.log(rteJson);
    } else {
      setShowError(true);
    }
  };

  return (
    <KeyboardAwareScreen>
      <View style={{ paddingHorizontal: theme.spacing.sm }}>
        <RichTextEditor
          showError={showError}
          errorText={"Please enter a description."}
          onChange={handleChange}
        />
      </View>
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          // onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >
          Review
        </Button>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
