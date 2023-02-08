import { View } from "react-native";
import { theme } from "../../../theme/theme";

export const HorizontalRule = () => (
  <View
    style={{
      width: "100%",
      borderBottomColor: theme.colors.gray.DEFAULT,
      borderWidth: 1,
    }}
  ></View>
);
