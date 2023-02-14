import { useCallback } from 'react';
import { Platform, View } from 'react-native';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { FacetFilters } from '../../components/FacetFilters/FacetFilters';
import { EVENT_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { IIndexable } from '../../interfaces/indexable';
import { theme } from '../../theme/theme';

export const EventFilters = ({
  filters,
  locationOptions,
  onChange,
  sportOptions,
}: {
  filters: IIndexable;
  locationOptions: DropdownItem[];
  onChange: (key: string, value: string) => void;
  sportOptions: DropdownItem[];
}) => {
  const { setEventFiltersActive, visible } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...filters, [id]: item.value };
      const activeFilters = Object.values(newFilters).filter((val) => !!val).length;

      setEventFiltersActive(activeFilters);
      onChange(id, item.value);
    },
    [filters, onChange, setEventFiltersActive]
  );

  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        display: 'flex',
        paddingHorizontal: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        ...(Platform.OS !== 'android' && {
          zIndex: 10,
        }),
      }}
    >
      <FacetFilters
        facetFilters={[
          {
            id: EVENT_FACETS.location,
            label: 'Location',
            facets: locationOptions,
          },
          {
            id: EVENT_FACETS.sport,
            label: 'Sport',
            facets: sportOptions,
          },
        ]}
        onChange={handleFacetsChange}
      />
    </View>
  );
};
