import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import { ListingCH1Media } from './ListingCH1Media';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { DropdownItem } from '../../components/DropdownPicker/DropdownPicker';
import { SimpleFilters } from '../../components/FacetFilters/SimpleFilters';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { MEDIA_FACETS } from '../../constants/filters';
import { MEDIA_SOURCES } from '../../constants/media';
import { Screen } from '../../features/Screen/Screen';
import { getFileTypeOptions, getStatusOptions } from '../../helpers/facets';
import { removeAlreadySelected } from '../../helpers/media';
import { useAthleteFields } from '../../hooks/useAthleteFields/useAthleteFields';
import { useEventFields } from '../../hooks/useEventFields/useEventFields';
import { useSearchFacets } from '../../hooks/useFacets/useFacets';
import { useMediaQuery } from '../../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';

export const AddCH1MediaScreen = ({ navigation, route }) => {
  const { eventFields, edit: editEventFields } = useEventFields();
  const { athleteFields, edit: editAthleteFields } = useAthleteFields();
  const { data: images, isFetching } = useMediaQuery();
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);
  const contentType = route?.params?.contentType;
  const single = route?.params?.single;
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;

  const availableImages = useMemo(() => {
    if (!images?.length) {
      return [];
    }

    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(images, eventFields[fieldKey])
      : removeAlreadySelected(images, athleteFields[fieldKey]);
  }, [athleteFields, contentType, eventFields, fieldKey, images]);

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
    // Cannot change selected status if media already selected
    //

    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.includes(image)) {
        return prevSelectedMedia.filter((item) => item.id !== image.id);
      }

      return [...prevSelectedMedia, image];
    });
  }, []);

  const onSelectSingle = useCallback(
    (image: Media) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({
          key: route.params.key,
          value: { ...image, source: MEDIA_SOURCES.CH_ONE },
        });
      } else {
        editAthleteFields({
          key: route.params.key,
          value: { ...image, source: MEDIA_SOURCES.CH_ONE },
        });
      }

      navigation.navigate(initialRoute, {
        isEditMedia: false,
      });
    },
    [contentType, editAthleteFields, editEventFields, initialRoute, navigation, route.params.key]
  );

  const onAdd = useCallback(() => {
    if (!route?.params?.key) {
      return;
    }

    if (contentType === CONTENT_TYPES.EVENT) {
      editEventFields({
        key: route.params.key,
        value: Array.isArray(eventFields[route.params.key])
          ? [
              ...eventFields[route.params.key],
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
    } else {
      editAthleteFields({
        key: route.params.key,
        value: Array.isArray(eventFields[route.params.key])
          ? [
              ...athleteFields[route.params.key],
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
    }

    navigation.navigate(initialRoute, {
      isEditMedia: false,
    });
  }, [
    athleteFields,
    contentType,
    editAthleteFields,
    editEventFields,
    eventFields,
    initialRoute,
    navigation,
    route.params.key,
    selectedMedia,
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
          {selectedMedia?.length ? `Add ${selectedMedia.length}` : 'Add'}
        </Button>
      </BottomActions>
    ),
    [onAdd, onDiscard, selectedMedia.length]
  );

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      <SimpleFilters facets={facetFilters} handleFacetsChange={handleFacetsChange} />
      <ListingCH1Media
        images={filteredImages as Media[]}
        isFetching={isFetching}
        onSelect={single ? onSelectSingle : onSelect}
        selectedMediaIDs={selectedMediaIDs}
      />
      {actions}
    </Screen>
  );
};
