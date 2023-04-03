import { useCallback, useMemo } from 'react';

import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MEDIA_FACETS } from '../../constants/filters';
import { useFilters } from '../../hooks/useFilters/useFilters';

export const MediaFilters = ({
  fileTypeOptions,
  statusOptions,
}: {
  fileTypeOptions: DropdownItem[];
  statusOptions: DropdownItem[];
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
        selectedValue: mediaFilterValues?.[MEDIA_FACETS.fileType],
      },
      {
        id: MEDIA_FACETS.status,
        label: 'State',
        facets: statusOptions,
        selectedValue: mediaFilterValues?.[MEDIA_FACETS.status],
      },
    ],
    [fileTypeOptions, mediaFilterValues, statusOptions]
  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
      <SearchBar onSearch={handleSearch} searchQuery={mediaSearchQuery} />
    </>
  );
};
