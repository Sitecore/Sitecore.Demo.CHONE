import { useCallback } from "react";
import { StyleProp } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  items: Array<{ label: string; value: any }>;
  onChange: (value: any) => void;
  selectedValue: any;
  style?: StyleProp<any>;
}

export const Select = ({ items, onChange, selectedValue, style }: Props) => {
  const finalStyle = style
    ? { backgroundColor: "white", ...style }
    : { backgroundColor: "white" };

  const onValueChange = useCallback((value) => {
    onChange(value);
  }, []);

  return (
    <Picker
      style={finalStyle}
      onValueChange={onValueChange}
      selectedValue={selectedValue}
    >
      {items?.length
        ? items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))
        : []}
    </Picker>
  );
};
