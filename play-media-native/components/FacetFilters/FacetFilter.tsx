import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { DropdownItem, DropdownPicker } from "../DropdownPicker/DropdownPicker";

type FacetFilterProps = FacetFilter & {
  onChange: (id: string, item: DropdownItem) => void;
  style?: StyleProp<ViewStyle>;
};

export interface FacetFilter {
  id: string;
  label: string;
  facets: DropdownItem[];
}

export const FacetFilter = ({
  id,
  label,
  facets,
  onChange,
  style,
}: FacetFilterProps) => {
  const handleChange = (item: DropdownItem) => {
    onChange(id, item);
  };

  return (
    <View style={style}>
      <Text>{label}</Text>
      <DropdownPicker selectItems={facets} onSelectItem={handleChange} />
    </View>
  );
};
