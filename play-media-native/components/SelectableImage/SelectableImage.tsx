import { Image, StyleProp, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { theme } from "../../theme/theme";

interface Props {
  containerStyle?: StyleProp<any>;
  onSelect: () => void;
  selected: boolean;
  style?: StyleProp<any>;
  uri: string;
}

export const SelectableImage = ({
  containerStyle,
  onSelect,
  selected,
  style,
  uri,
}: Props) => {
  return (
    <View style={containerStyle}>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 5,
          zIndex: 10,
        }}
      >
        <Checkbox
          color={theme.colors.pink.DEFAULT}
          onPress={onSelect}
          status={selected ? "checked" : "unchecked"}
          uncheckedColor={theme.colors.pink.DEFAULT}
        />
      </View>
      <Image source={{ uri }} style={style} />
    </View>
  );
};
