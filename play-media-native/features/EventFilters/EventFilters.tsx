import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { EVENT_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';

export const EventFilters = ({
  locationOptions,
  sportOptions,
}: {
  locationOptions: DropdownItem[];
  sportOptions: DropdownItem[];
}) => {
  const {
    visible,
    eventFilterValues,
    setEventFilterValues,
    eventSearchQuery,
    setEventSearchQuery,
  } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...eventFilterValues, [id]: item.value };
      setEventFilterValues(newFilters);
    },
    [setEventFilterValues, eventFilterValues]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setEventSearchQuery(query);
    },
    [setEventSearchQuery]
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

  return (
    <>
      <SearchBar onSearch={handleSearch} searchQuery={eventSearchQuery} />
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
    </>
  );
};
