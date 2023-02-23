import { Platform, View } from 'react-native';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { FacetFilters } from '../../components/FacetFilters/FacetFilters';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { FacetFilter } from '../../interfaces/facets';
import { theme } from '../../theme/theme';

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
        display: 'flex',
        paddingHorizontal: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        ...(Platform.OS !== 'android' && {
          zIndex: 10,
        }),
      }}
    >
      <FacetFilters
        facetFilters={facets}
        onChange={handleFacetsChange}
        type={CONTENT_TYPES.ATHLETE}
      />
    </View>
  );
};
