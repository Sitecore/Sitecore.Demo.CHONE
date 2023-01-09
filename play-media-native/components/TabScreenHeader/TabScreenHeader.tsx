import { View } from "react-native";
import { Logo } from "../Logo/Logo";
import { Button } from "react-native-paper";
import { theme } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

export const TabScreenHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        backgroundColor: theme.colors.black.darkest,
      }}
    >
      <Logo />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: theme.spacing.sm,
        }}
      >
        <Button
          icon={({ size, color }) => <FontAwesomeIcon icon={faFilter} color={color} size={size} />}
          labelStyle={{
            fontFamily: theme.fontFamily.medium,
            fontSize: theme.fontSize.base,
            lineHeight: 30,
          }}
          style={{
            marginRight: theme.spacing.xs,
          }}
        >
          Filter
        </Button>
        <Button
          mode="contained"
          icon={({ size, color }) => <FontAwesomeIcon icon={faPlus} color={color} size={size} />}
          labelStyle={{
            fontFamily: theme.fontFamily.medium,
            fontSize: theme.fontSize.base,
            lineHeight: 30,
          }}
        >
          Event
        </Button>
      </View>
    </View>
  );
};
