import { FacetFilters } from "../../components/FacetFilters/FacetFilters";
import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";
import { Platform, View } from "react-native";
import { theme } from "../../theme/theme";
import { FacetFilter } from "../../interfaces/facets";

export const AthleteFiltersView = ({
  facets,
  handleFacetsChange,
}: {
  facets: FacetFilter[];
  handleFacetsChange: (id: string, item: DropdownItem) => void;
}) => {
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
      <FacetFilters facetFilters={facets} onChange={handleFacetsChange} />
    </View>
  );
};
