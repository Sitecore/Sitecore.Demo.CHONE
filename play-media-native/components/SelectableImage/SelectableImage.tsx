import { Image, StyleProp, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { theme } from "../../theme/theme";

interface Props {
  onSelect: () => void;
  selected: boolean;
  style?: StyleProp<any>;
  uri: string;
}

export const SelectableImage = ({ onSelect, selected, style, uri }) => {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 5,
          zIndex: 10,
          //   borderWidth: 2,
          //   borderColor: theme.colors.white.DEFAULT,
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
