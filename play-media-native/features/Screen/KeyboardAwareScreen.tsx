import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../theme/styles";
import { theme } from "../../theme/theme";

export const KeyboardAwareScreen = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraHeight={Platform.OS === "ios" ? theme.spacing.xxl : 0}
      extraScrollHeight={Platform.OS === "ios" ? theme.spacing.xxl : 0}
      style={{
        backgroundColor: theme.colors.black.darkest,
      }}
      contentContainerStyle={{
        ...styles.screen,
        ...styles.centered,
        flexGrow: 1,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
