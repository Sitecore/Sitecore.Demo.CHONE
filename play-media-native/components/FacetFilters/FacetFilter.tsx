import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { FacetFilter as IFacetFilter } from '../../interfaces/facets';
import { theme } from '../../theme/theme';
import { DropdownItem, DropdownPicker } from '../DropdownPicker/DropdownPicker';

type FacetFilterProps = IFacetFilter & {
  onChange: (id: string, item: DropdownItem) => void;
  style?: StyleProp<ViewStyle>;
  selectedValue?: string;
};

export const FacetFilter = ({
  id,
  label,
  facets,
  onChange,
  style,
  selectedValue = null,
}: FacetFilterProps) => {
  const handleChange = (item: DropdownItem) => {
    onChange(id, item);
  };

  return (
    <View style={style}>
      <Text style={{ marginBottom: theme.spacing.xxs }}>{label}</Text>
      <DropdownPicker
        selectItems={facets}
        onSelectItem={handleChange}
        selectedValue={selectedValue}
      />
    </View>
  );
};
