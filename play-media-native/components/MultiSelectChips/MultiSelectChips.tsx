import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

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
          style={{ margin: 5, padding: 5 }}
        >
          <Text>{item.label}</Text>
        </Chip>
      ))}
    </View>
  );
};
