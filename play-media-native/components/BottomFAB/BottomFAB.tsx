import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { theme } from "../../theme/theme";

export const defaultStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: theme.spacing.xs,
    right: theme.spacing.xs,
    bottom: theme.spacing.xs,
  },
});

interface Props {
  color?: string;
  disabled?: boolean;
  icon: IconSource;
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BottomFAB = ({
  color,
  disabled,
  icon,
  label,
  style,
  onPress,
}: Props) => {
  const stylesFinal = useMemo(() => [defaultStyle.fab, style], []);

  return (
    <FAB
      color={color}
      disabled={disabled}
      icon={icon}
      label={label}
      style={stylesFinal}
      onPress={onPress}
    />
  );
};
