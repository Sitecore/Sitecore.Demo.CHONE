import { useCallback } from "react";
import { FacetFilters } from "../../components/FacetFilters/FacetFilters";
import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";
import { Platform, View } from "react-native";
import { theme } from "../../theme/theme";
import { useFilters } from "../../hooks/useFilters/useFilters";
import { IIndexable } from "../../interfaces/indexable";
import { ATHLETE_FACETS } from "../../constants/filters";

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

  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        display: "flex",
        paddingHorizontal: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        ...(Platform.OS !== "android" && {
          zIndex: 10,
        }),
      }}
    >
      <FacetFilters
        facetFilters={[
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
        ]}
        onChange={handleFacetsChange}
      />
    </View>
  );
};
