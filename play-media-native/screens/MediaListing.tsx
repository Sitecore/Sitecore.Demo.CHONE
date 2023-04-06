import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

import { MaterialIcon } from '../components/Icon/MaterialIcon';
import { ListingImages } from '../features/ListingImages/ListingImages';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaFilters } from '../features/MediaFilters/MediaFilters';
import { MediaItemCardDisplay } from '../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemGridDisplay } from '../features/MediaItemGridDisplay/MediaItemGridDisplay';
import { MediaItemListDisplay } from '../features/MediaItemListDisplay/MediaItemListDisplay';
import { Screen } from '../features/Screen/Screen';
import { ListingImageDisplayType } from '../features/SelectDisplayButtons/SelectDisplayButtons';
import { getFileTypeOptions, getStatusOptions } from '../helpers/facets';
import { useCamera } from '../hooks/useCamera/useCamera';
import { useDeviceLibrary } from '../hooks/useDeviceLibrary/useDeviceLibrary';
import { useSearchFacets } from '../hooks/useFacets/useFacets';
import { useFilters } from '../hooks/useFilters/useFilters';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { DeviceMedia, Media } from '../interfaces/media';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const MediaListingScreen = ({ navigation }) => {
  const {
    data: images,
    isLoading: isFetchingInitialMedia,
    refetch: refetchMedia,
    isRefetching: isRefetchingMedia,
  } = useMediaQuery();

  const [visible, setVisible] = useState(false);
  const { launch: launchCamera } = useCamera();
  const { launch: launchLibrary } = useDeviceLibrary();

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

  const handleCameraPress = useCallback(() => {
    launchCamera((image: DeviceMedia) => {
      navigation.navigate('CreateMedia', { image });
    });

    setVisible(false);
  }, [launchCamera, navigation]);

  const handleMediaLibraryPress = useCallback(() => {
    launchLibrary((image: DeviceMedia) => {
      navigation.navigate('CreateMedia', { image });
    });

    setVisible(false);
  }, [launchLibrary, navigation]);

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
      <View style={styles.fab}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button icon="plus" onPress={() => setVisible(true)} mode="contained">
              Add media
            </Button>
          }
          anchorPosition="bottom"
          contentStyle={{
            marginBottom: 105,
            backgroundColor: theme.colors.white.DEFAULT,
          }}
        >
          <Menu.Item
            leadingIcon={() => (
              <MaterialIcon
                name="camera-outline"
                color={theme.colors.black.DEFAULT}
                size={theme.fontSize.lg}
              />
            )}
            onPress={handleCameraPress}
            title="Camera"
            titleStyle={styles.menuItem}
            dense
          />
          <Menu.Item
            leadingIcon={() => (
              <MaterialIcon
                name="folder-open-outline"
                color={theme.colors.black.DEFAULT}
                size={theme.fontSize.lg}
              />
            )}
            onPress={handleMediaLibraryPress}
            title="Device"
            titleStyle={styles.menuItem}
            dense
          />
        </Menu>
      </View>
    </Screen>
  );
};
