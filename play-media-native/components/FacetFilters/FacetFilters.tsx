import { useCallback } from 'react';
import { View } from 'react-native';

import { FacetFilter } from './FacetFilter';
import { FacetFilter as IFacetFilter } from '../../interfaces/facets';
import { theme } from '../../theme/theme';
import { DropdownItem } from '../DropdownPicker/DropdownPicker';

type FacetFiltersProps = {
  facetFilters: IFacetFilter[];
  onChange: (id: string, item: DropdownItem) => void;
};

export const FacetFilters = ({ facetFilters, onChange }: FacetFiltersProps) => {
  const handleChange = useCallback(
    (id: string, item: DropdownItem) => {
      onChange(id, item);
    },
    [onChange]
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -theme.spacing.xxs,
      }}
    >
      {facetFilters.map((facet) => (
        <FacetFilter
          key={facet.id}
          id={facet.id}
          label={facet.label}
          facets={facet.facets}
          onChange={handleChange}
          style={{
            paddingHorizontal: theme.spacing.xxs,
            flexShrink: 1,
          }}
          selectedValue={facet.selectedValue}
        />
      ))}
    </View>
  );
};
