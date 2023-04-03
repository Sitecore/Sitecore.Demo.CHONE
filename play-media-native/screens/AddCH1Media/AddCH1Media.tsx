import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import { ListingCH1Media } from './ListingCH1Media';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MEDIA_FACETS } from '../../constants/filters';
import { MEDIA_SOURCES } from '../../constants/media';
import { Screen } from '../../features/Screen/Screen';
import { getFileTypeOptions, getStatusOptions } from '../../helpers/facets';
import { removeAlreadySelected } from '../../helpers/media';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { useSearchFacets } from '../../hooks/useFacets/useFacets';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { useMediaQuery } from '../../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';

export const AddCH1MediaScreen = ({ navigation, route }) => {
  const { contentItems, edit } = useContentItems();
  const { data: images, isFetching } = useMediaQuery();
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);

  const { visible: isVisible } = useFilters();

  // route params
  //
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const single = route?.params?.single;
  const stateKey = route?.params?.stateKey;

  const availableImages = useMemo(() => {
    if (!images?.length) {
      return [];
    }

    return removeAlreadySelected(images, contentItems[stateKey][fieldKey]);
  }, [contentItems, fieldKey, images, stateKey]);

  const [facets, setFacets] = useState<Record<string, any>>({
    [MEDIA_FACETS.fileType]: '',
    [MEDIA_FACETS.status]: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = useSearchFacets({
    initialItems: availableImages?.length ? availableImages : [],
    facets,
    query: searchQuery,
  });

  const fileTypeOptions = useMemo(() => getFileTypeOptions(images), [images]);
  const statusOptions = useMemo(() => getStatusOptions(images), [images]);

  const facetFilters = useMemo(
    () => [
      {
        id: MEDIA_FACETS.fileType,
        label: 'File type',
        facets: fileTypeOptions,
        selectedValue: '',
      },
      {
        id: MEDIA_FACETS.status,
        label: 'State',
        facets: statusOptions,
        selectedValue: '',
      },
    ],
    [fileTypeOptions, statusOptions]
  );

  const handleFacetsChange = useCallback((key: string, item: DropdownItem) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: item.value }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const onSelect = useCallback((image: Media) => {
    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.includes(image)) {
        return prevSelectedMedia.filter((item) => item.id !== image.id);
      }

      return [...prevSelectedMedia, image];
    });
  }, []);

  const onSelectSingle = useCallback((image: Media) => {
    setSelectedMedia([image]);
  }, []);

  const onAdd = useCallback(() => {
    if (!fieldKey) {
      return;
    }

    edit({
      id: stateKey,
      key: route.params.key,
      value: Array.isArray(contentItems[stateKey][fieldKey])
        ? [
            ...contentItems[stateKey][fieldKey],
            ...selectedMedia.map((item) => ({
              ...item,
              source: MEDIA_SOURCES.CH_ONE,
            })),
          ]
        : selectedMedia.map((item) => ({
            ...item,
            source: MEDIA_SOURCES.CH_ONE,
          }))[0],
    });

    navigation.navigate(initialRoute, {
      isEditMedia: false,
    });
  }, [
    contentItems,
    edit,
    fieldKey,
    initialRoute,
    navigation,
    route.params.key,
    selectedMedia,
    stateKey,
  ]);

  const onDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const actions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onDiscard}
        >
          Discard
        </Button>
        <Button
          disabled={!selectedMedia?.length}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onAdd}
        >
          {single && contentItems[stateKey][fieldKey]
            ? 'Change'
            : !single && selectedMedia?.length
            ? `Add ${selectedMedia.length}`
            : 'Add'}
        </Button>
      </BottomActions>
    ),
    [contentItems, fieldKey, onAdd, onDiscard, selectedMedia.length, single, stateKey]
  );

  const filters = useMemo(
    () =>
      isVisible && (
        <>
          <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
          <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
        </>
      ),
    [isVisible, facetFilters, handleFacetsChange, handleSearch, searchQuery]
  );

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      {filters}
      <ListingCH1Media
        images={filteredImages as Media[]}
        isFetching={isFetching}
        onSelect={single ? onSelectSingle : onSelect}
        selectedMediaIDs={selectedMediaIDs}
        single={single}
      />
      {actions}
    </Screen>
  );
};
