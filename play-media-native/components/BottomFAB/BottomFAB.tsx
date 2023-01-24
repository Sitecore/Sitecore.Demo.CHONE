import { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { styles } from "../../theme/styles";
import { theme } from "../../theme/theme";

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
  const stylesFinal = useMemo(() => [styles.fab, style], []);

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
