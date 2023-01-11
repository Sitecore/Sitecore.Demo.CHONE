import { View } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../../theme/theme";

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

export const BottomActions = () => {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        bottom: 0,
        zIndex: 10,
        paddingBottom: 10,
        backgroundColor: theme.colors.black.darkest,
      }}
    >
      <Button
        mode="outlined"
        labelStyle={labelStyle}
        style={buttonStyle}
        onPress={() => {}}
      >
        Discard
      </Button>
      <Button
        mode="contained"
        labelStyle={labelStyle}
        style={buttonStyle}
        onPress={() => {}}
      >
        Next
      </Button>
    </View>
  );
};
