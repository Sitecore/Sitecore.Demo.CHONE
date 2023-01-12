import { View } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { IconButton } from "react-native-paper";
import { theme } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { TabHeaderNavigationProp } from "../../interfaces/navigators";

export const StackScreenHeader = () => {
  const navigation = useNavigation<TabHeaderNavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        backgroundColor: theme.colors.black.darkest,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        mode="contained"
        icon={({ size, color }) => (
          <FontAwesomeIcon icon={faArrowLeft} color={color} size={size} />
        )}
        iconColor={theme.colors.white.DEFAULT}
        containerColor={theme.colors.transparent}
        style={{
          position: "absolute",
          left: 0,
          top: 18,
        }}
        onPress={() => navigation.goBack()}
      />
      <Logo style={{ marginHorizontal: "auto" }} />
    </View>
  );
};
