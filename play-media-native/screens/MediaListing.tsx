import { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllMedia } from '../api/queries/getMedia';
import { ListingImages } from '../features/ListingImages/ListingImages';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaItemCardDisplay } from '../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemListDisplay } from '../features/MediaItemListDisplay/MediaItemListDisplay';
import { Screen } from '../features/Screen/Screen';
import { ListingImageDisplayType } from '../features/SelectDisplayButtons/SelectDisplayButtons';
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
  } = useQuery('media', () => getAllMedia());

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

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
      <View style={{ marginBottom: 120 }}>
        <ListingImages
          images={images as Media[]}
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
