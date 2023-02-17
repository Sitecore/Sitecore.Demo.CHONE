import { useCallback } from 'react';
import { View } from 'react-native';

import { FacetFilter, IFacetFilter } from './FacetFilter';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { theme } from '../../theme/theme';
import { DropdownItem } from '../DropdownPicker/DropdownPicker';

type FacetFiltersProps = {
  facetFilters: IFacetFilter[];
  onChange: (id: string, item: DropdownItem) => void;
  type: string;
};

export const FacetFilters = ({ facetFilters, onChange, type }: FacetFiltersProps) => {
  const { athleteFilterValues, eventFilterValues } = useFilters();

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
          selectedValue={
            type === CONTENT_TYPES.EVENT
              ? eventFilterValues?.[facet.id]
              : athleteFilterValues?.[facet.id]
          }
        />
      ))}
    </View>
  );
};
