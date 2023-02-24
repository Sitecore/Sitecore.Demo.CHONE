import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { EVENT_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { IIndexable } from '../../interfaces/indexable';

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
  const { visible, eventFilterValues, setEventFiltersActive, setEventFilterValues } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...filters, [id]: item.value };
      setEventFilterValues(newFilters);

      const activeFilters = Object.values(newFilters).filter((val) => !!val).length;
      setEventFiltersActive(activeFilters);

      onChange(id, item.value);
    },
    [filters, onChange, setEventFiltersActive, setEventFilterValues]
  );

  const facetFilters = useMemo(
    () => [
      {
        id: EVENT_FACETS.location,
        label: 'Location',
        facets: locationOptions,
        selectedValue: eventFilterValues?.[EVENT_FACETS.location],
      },
      {
        id: EVENT_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
        selectedValue: eventFilterValues?.[EVENT_FACETS.sport],
      },
    ],
    [eventFilterValues, locationOptions, sportOptions]
  );

  if (!visible) {
    return null;
  }

  return <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />;
};
