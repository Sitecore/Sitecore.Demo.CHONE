import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { MEDIA_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { IIndexable } from '../../interfaces/indexable';

export const MediaFilters = ({
  filters,
  fileTypeOptions,
  onChange,
  stateOptions,
}: {
  filters: IIndexable;
  fileTypeOptions: DropdownItem[];
  onChange: (key: string, value: string) => void;
  stateOptions: DropdownItem[];
}) => {
  const { visible, setMediaFiltersActive, setMediaFilterValues } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...filters, [id]: item.value };
      setMediaFilterValues(newFilters);

      const activeFilters = Object.values(newFilters).filter((val) => !!val).length;
      setMediaFiltersActive(activeFilters);

      onChange(id, item.value);
    },
    [filters, onChange, setMediaFilterValues, setMediaFiltersActive]
  );

  const facetFilters = useMemo(
    () => [
      {
        id: MEDIA_FACETS.fileType,
        label: 'File type',
        facets: fileTypeOptions,
        selectedValue: '',
      },
      {
        id: MEDIA_FACETS.state,
        label: 'State',
        facets: stateOptions,
        selectedValue: '',
      },
    ],
    [fileTypeOptions, stateOptions]
  );

  if (!visible) {
    return null;
  }

  return <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />;
};
