import { View } from "react-native";
import { Chip } from "react-native-paper";
import { theme } from "../../theme/theme";

interface Props {
  items: Array<{ label: string; value: any; selected: boolean }>;
  onSelect: (item: any) => void;
}

export const MultiSelectChips = ({ items, onSelect }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {items.map((item) => (
        <Chip
          key={item.label}
          mode="outlined"
          onPress={() => onSelect(item)}
          showSelectedOverlay
          selected={item.selected}
          style={{ margin: theme.spacing.xxs, padding: theme.spacing.xxs }}
        >
          {item.label}
        </Chip>
      ))}
    </View>
  );
};
