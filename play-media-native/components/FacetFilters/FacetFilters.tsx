import { View } from "react-native";
import { theme } from "../../theme/theme";
import { DropdownItem } from "../DropdownPicker/DropdownPicker";
import { FacetFilter } from "./FacetFilter";

type FacetFiltersProps = {
  facetFilters: FacetFilter[];
  onChange: (id: string, item: DropdownItem) => void;
};

export const FacetFilters = ({ facetFilters, onChange }: FacetFiltersProps) => {
  const handleChange = (id: string, item: DropdownItem) => {
    onChange(id, item);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
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
        />
      ))}
    </View>
  );
};
