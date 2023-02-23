import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { theme } from '../../theme/theme';

export interface DropdownItem {
  label: string | undefined;
  value: string | undefined;
}

type DropdownPickerProps = {
  selectItems: DropdownItem[];
  onSelectItem: (item: DropdownItem) => void;
  placeholder?: string;
  selectedValue?: string;
};

export const DropdownPicker = ({
  selectItems,
  onSelectItem,
  placeholder = 'All',
  selectedValue = null,
}: DropdownPickerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
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
      labelProps={{ numberOfLines: 1 }}
      style={{
        borderRadius: 0,
        minHeight: 40,
        maxHeight: 40,
      }}
      dropDownContainerStyle={{
        borderRadius: 0,
      }}
      textStyle={{
        fontFamily: theme.fontFamily.DEFAULT,
        fontSize: theme.fontSize.xs,
      }}
      listItemContainerStyle={{
        minHeight: 40,
        height: 'auto',
      }}
    />
  );
};
