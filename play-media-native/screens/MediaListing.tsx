import { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { ListingImages } from '../features/ListingImages/ListingImages';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaFilters } from '../features/MediaFilters/MediaFilters';
import { MediaItemCardDisplay } from '../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemListDisplay } from '../features/MediaItemListDisplay/MediaItemListDisplay';
import { Screen } from '../features/Screen/Screen';
import { ListingImageDisplayType } from '../features/SelectDisplayButtons/SelectDisplayButtons';
import { getFileTypeOptions } from '../helpers/facets';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';

const gridItemStyle = {
  height: 120,
  flex: 0.5,
  margin: 2,
};

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

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const fileTypeOptions = useMemo(() => {
    return getFileTypeOptions(images);
  }, [images]);

  const handleRefresh = useCallback(() => {
    refetchMedia();
  }, [refetchMedia]);

  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <Image source={{ uri: item.fileUrl }} style={gridItemStyle} />
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => <MediaItemListDisplay item={item} />,
      [ListingImageDisplayType.CARDS]: ({ item }) => <MediaItemCardDisplay item={item} />,
    }),
    []
  );

  if (isFetchingInitialMedia) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <MediaFilters fileTypeOptions={fileTypeOptions} statusOptions={[]} />
      <View style={{ marginBottom: 120 }}>
        <ListingImages
          images={filteredImages as Media[]}
          renderItems={renderItems}
          showSearch={false}
          onRefresh={handleRefresh}
          onScroll={calcScrollOffset}
          isRefreshing={isRefetchingMedia}
        />
      </View>
      <AnimatedFAB
        icon="plus"
        label="Add new media"
        extended={isTopEdge}
        onPress={() => navigation.navigate('AddEvent')}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </Screen>
  );
};
