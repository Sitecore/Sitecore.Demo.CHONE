import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { ATHLETE_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { IIndexable } from '../../interfaces/indexable';

export const AthleteFilters = ({
  filters,
  nationalityOptions,
  onChange,
  sportOptions,
}: {
  filters: IIndexable;
  nationalityOptions: DropdownItem[];
  onChange: (key: string, value: any) => void;
  sportOptions: DropdownItem[];
}) => {
  const { visible, athleteFilterValues, setAthleteFiltersActive, setAthleteFilterValues } =
    useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...filters, [id]: item.value };
      setAthleteFilterValues(newFilters);

      const activeFilters = Object.values(newFilters).filter((val) => !!val).length;
      setAthleteFiltersActive(activeFilters);

      onChange(id, item.value);
    },
    [filters, onChange, setAthleteFiltersActive, setAthleteFilterValues]
  );

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.nationality,
        label: 'Nationality',
        facets: nationalityOptions,
        selectedValue: athleteFilterValues?.[ATHLETE_FACETS.nationality],
      },
      {
        id: ATHLETE_FACETS.sport,
        label: 'Sport',
        facets: sportOptions,
        selectedValue: athleteFilterValues?.[ATHLETE_FACETS.sport],
      },
    ],
    [athleteFilterValues, nationalityOptions, sportOptions]
  );

  if (!visible) {
    return null;
  }

  return <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />;
};
