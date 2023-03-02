import { View } from 'react-native';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { FacetFilters } from '../../components/FacetFilters/FacetFilters';
import { FacetFilter } from '../../interfaces/facets';
import { styles } from '../../theme/styles';

export const SimpleFilters = ({
  facets,
  handleFacetsChange,
}: {
  facets: FacetFilter[];
  handleFacetsChange: (id: string, item: DropdownItem) => void;
}) => {
  return (
    <View style={styles.facetFilters}>
      <FacetFilters facetFilters={facets} onChange={handleFacetsChange} />
    </View>
  );
};
