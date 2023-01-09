import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

interface Props {
  items: Array<{ label: string; value: any; selected: boolean }>;
}

const mockItems = [
  { label: "aaa", value: "aaa", selected: true },
  { label: "aaabbb", value: "aaabbb", selected: false },
  { label: "aaagggggggg", value: "aaagggggggg", selected: true },
  { label: "aaattttttt", value: "aaattttttt", selected: false },
  { label: "aaa1212121212", value: "aaa1212121212", selected: true },
];

export const MultiSelectChips = ({ items }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {mockItems.map((item) => (
        <Chip key={item.label} style={{ margin: 5 }} selected={item.selected}>
          <Text>{item.label}</Text>
        </Chip>
      ))}
    </View>
  );
};
