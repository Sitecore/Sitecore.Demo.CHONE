import { View } from "react-native";
import { styles } from "../../theme/styles";
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
      style={[
        styles.container,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: -theme.spacing.xxs,
          zIndex: 10,
        },
      ]}
    >
      {facetFilters.map((facet, i) => (
        <FacetFilter
          key={facet.id}
          id={facet.id}
          label={facet.label}
          facets={facet.facets}
          onChange={handleChange}
          style={{
            paddingHorizontal: theme.spacing.xxs,
            flexShrink: 1,
            zIndex: -i,
          }}
        />
      ))}
    </View>
  );
};
