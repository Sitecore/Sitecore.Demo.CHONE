import { PropsWithChildren, ReactNode } from "react";
import { StyleProp, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { theme } from "../../theme/theme";

interface Props {
  children: PropsWithChildren<ReactNode | ReactNode[]>;
  onSelect: () => void;
  right?: number;
  selected: boolean;
  style?: StyleProp<any>;
  top?: number;
}

export const SelectableView = ({
  children,
  onSelect,
  right,
  selected,
  style,
  top,
}: Props) => {
  return (
    <View style={style}>
      <View
        style={{
          position: "absolute",
          top: top || 10,
          right: right || 5,
          zIndex: 10,
        }}
      >
        <Checkbox
          color={theme.colors.white.DEFAULT}
          onPress={onSelect}
          status={selected ? "checked" : "unchecked"}
          uncheckedColor={theme.colors.white.DEFAULT}
        />
      </View>
      {children}
    </View>
  );
};
