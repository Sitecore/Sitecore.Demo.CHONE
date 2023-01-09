import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";

const defaultStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
    borderRadius: 50,
  },
});

interface Props {
  color?: string;
  icon: string;
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BottomFAB = ({ color, icon, label, style, onPress }: Props) => {
  const stylesFinal = useMemo(() => [defaultStyle.fab, style], []);

  return (
    <FAB
      color={color}
      icon={icon}
      label={label}
      style={stylesFinal}
      onPress={onPress}
    />
  );
};
