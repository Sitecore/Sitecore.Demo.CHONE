import { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { BottomFAB } from '../components/BottomFAB/BottomFAB';
import { ListingImages } from '../features/ListingImages/ListingImages';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaFilters } from '../features/MediaFilters/MediaFilters';
import { MediaItemCardDisplay } from '../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemGridDisplay } from '../features/MediaItemGridDisplay/MediaItemGridDisplay';
import { MediaItemListDisplay } from '../features/MediaItemListDisplay/MediaItemListDisplay';
import { Screen } from '../features/Screen/Screen';
import { ListingImageDisplayType } from '../features/SelectDisplayButtons/SelectDisplayButtons';
import { getFileTypeOptions, getStatusOptions } from '../helpers/facets';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../interfaces/media';

export const MediaListingScreen = ({ navigation }) => {
  const {
    data: images,
    isLoading: isFetchingInitialMedia,
    refetch: refetchMedia,
    isRefetching: isRefetchingMedia,
  } = useMediaQuery();

  const { mediaFilterValues, mediaSearchQuery } = useFilters();

  const filteredImages = useSearchFacets({
    initialItems: images?.length ? images : [],
    facets: mediaFilterValues,
    query: mediaSearchQuery,
  });

  const fileTypeOptions = useMemo(() => getFileTypeOptions(images), [images]);
  const statusOptions = useMemo(() => getStatusOptions(images), [images]);

  const handleRefresh = useCallback(() => {
    refetchMedia();
  }, [refetchMedia]);

  const onCardPress = useCallback(
    (media: Media) => {
      navigation.navigate('MediaDetail', { id: media.id, title: media.name });
    },
    [navigation]
  );

  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <MediaItemGridDisplay item={item} onPress={onCardPress} />
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => (
        <MediaItemListDisplay item={item} onPress={onCardPress} />
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <MediaItemCardDisplay item={item} onPress={onCardPress} />
      ),
    }),
    [onCardPress]
  );

  if (isFetchingInitialMedia) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <MediaFilters fileTypeOptions={fileTypeOptions} statusOptions={statusOptions} />
      <View style={{ marginBottom: 120 }}>
        <ListingImages
          images={filteredImages as Media[]}
          renderItems={renderItems}
          showSearch={false}
          onRefresh={handleRefresh}
          isRefreshing={isRefetchingMedia}
        />
      </View>
      <BottomFAB
        icon="plus"
        label="Add new media"
        onPress={() => navigation.navigate('AddEvent')}
      />
    </Screen>
  );
};
