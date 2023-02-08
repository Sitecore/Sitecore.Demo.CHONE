import { useCallback, useMemo } from "react";
import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";
import { useFilters } from "../../hooks/useFilters/useFilters";
import { IIndexable } from "../../interfaces/indexable";
import { ATHLETE_FACETS } from "../../constants/filters";
import { AthleteFiltersView } from "./AthleteFiltersView";

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
  const { setAthleteFiltersActive, visible } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...filters, [id]: item.value };
      const activeFilters = Object.values(newFilters).filter(
        (val) => !!val
      ).length;

      setAthleteFiltersActive(activeFilters);
      onChange(id, item.value);
    },
    [filters, onChange, setAthleteFiltersActive]
  );

  const facetFilters = useMemo(
    () => [
      {
        id: ATHLETE_FACETS.nationality,
        label: "Nationality",
        facets: nationalityOptions,
      },
      {
        id: ATHLETE_FACETS.sport,
        label: "Sport",
        facets: sportOptions,
      },
    ],
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <AthleteFiltersView
      facets={facetFilters}
      handleFacetsChange={handleFacetsChange}
    />
  );
};
