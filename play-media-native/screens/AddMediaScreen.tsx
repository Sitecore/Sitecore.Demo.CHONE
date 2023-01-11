import { View } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../theme/theme";

const buttonStyle = {
  borderWidth: 1,
  borderColor: theme.colors.yellow.DEFAULT,
  marginHorizontal: theme.spacing.xs,
};

const labelStyle = {
  fontFamily: theme.fontFamily.medium,
  fontSize: theme.fontSize.base,
  lineHeight: 30,
};

export const AddMediaScreen = () => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Button
          icon="camera"
          labelStyle={labelStyle}
          mode="outlined"
          style={buttonStyle}
          onPress={() => {}}
        >
          Discard
        </Button>
        <Button
          icon="camera"
          labelStyle={labelStyle}
          mode="outlined"
          style={buttonStyle}
          onPress={() => {}}
        >
          Next
        </Button>
      </View>
    </View>
  );
};
