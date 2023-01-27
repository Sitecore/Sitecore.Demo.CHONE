import { View } from "react-native";
import { RichTextEditor } from "../../components/RichTextEditor/RichTextEditor";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { BottomActions } from "../../components/BottomActions/BottomActions";

export const RichTextView = () => {
  return (
    <>
      <RichTextEditor />
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
          // onPress={onAdd}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >
          Review
        </Button>
      </BottomActions>
    </>
  );
};
