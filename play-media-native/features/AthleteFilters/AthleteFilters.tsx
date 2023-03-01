import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ATHLETE_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';

export const AthleteFilters = ({
  statusOptions,
  sportOptions,
}: {
  statusOptions: DropdownItem[];
  sportOptions: DropdownItem[];
}) => {
  const {
    visible,
    athleteFilterValues,
    setAthleteFilterValues,
    athleteSearchQuery,
    setAthleteSearchQuery,
  } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...athleteFilterValues, [id]: item.value };
      setAthleteFilterValues(newFilters);
    },
    [athleteFilterValues, setAthleteFilterValues]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setAthleteSearchQuery(query);
    },
    [setAthleteSearchQuery]
  );

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
        selectedValue: athleteFilterValues?.[ATHLETE_FACETS.sport],
      },
      {
        id: ATHLETE_FACETS.status,
        label: 'Status',
        facets: statusOptions,
        selectedValue: athleteFilterValues?.[ATHLETE_FACETS.status],
      },
    ],
    [athleteFilterValues, statusOptions, sportOptions]
  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} searchQuery={athleteSearchQuery} />
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
    </>
  );
};
