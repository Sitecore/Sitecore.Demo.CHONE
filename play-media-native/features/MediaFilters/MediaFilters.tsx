import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MEDIA_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';

export const MediaFilters = ({
  fileTypeOptions,
  stateOptions,
}: {
  fileTypeOptions: DropdownItem[];
  stateOptions: DropdownItem[];
}) => {
  const {
    visible,
    mediaFilterValues,
    setMediaFilterValues,
    mediaSearchQuery,
    setMediaSearchQuery,
  } = useFilters();

  const handleFacetsChange = useCallback(
    (id: string, item: DropdownItem) => {
      const newFilters = { ...mediaFilterValues, [id]: item.value };
      setMediaFilterValues(newFilters);
    },
    [mediaFilterValues, setMediaFilterValues]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setMediaSearchQuery(query);
    },
    [setMediaSearchQuery]
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

  return (
    <>
      <SearchBar onSearch={handleSearch} searchQuery={mediaSearchQuery} />
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
    </>
  );
};
