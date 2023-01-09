import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export const Select = ({ items, style }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const finalStyle = style
    ? { backgroundColor: "white", ...style }
    : { backgroundColor: "white" };

  return (
    <Picker
      style={finalStyle}
      onValueChange={(value) => setSelectedValue(value)}
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
