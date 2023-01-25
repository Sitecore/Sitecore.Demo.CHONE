import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../../theme/theme";

export interface DropdownItem {
  label: string | undefined;
  value: string | undefined;
}

export const DropdownPicker = ({
  selectItems,
  onSelectItem,
  placeholder = "All",
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(selectItems);

  useEffect(() => {
    setItems(selectItems);
  }, [selectItems]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onSelectItem={(item: DropdownItem) => {
        onSelectItem(item);
      }}
      placeholder={placeholder}
      style={{
        borderRadius: 0,
      }}
      dropDownContainerStyle={{
        borderRadius: 0,
      }}
      textStyle={{
        fontFamily: theme.fontFamily.DEFAULT,
        fontSize: theme.fontSize.xs,
      }}
    />
  );
};
