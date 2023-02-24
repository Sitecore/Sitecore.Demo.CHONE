import { useMemo } from 'react';
import { Image, View } from 'react-native';

import { SelectableView } from '../../components/SelectableView/SelectableView';
import { ListingImages } from '../../features/ListingImages/ListingImages';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { MediaItemCardDisplay } from '../../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemListDisplay } from '../../features/MediaItemListDisplay/MediaItemListDisplay';
import { ListingImageDisplayType } from '../../features/SelectDisplayButtons/SelectDisplayButtons';
import { useMedia } from '../../hooks/useMedia/useMedia';
import { Media } from '../../interfaces/media';

const fullWidthStyle = {
  height: 120,
  width: '100%',
  margin: 2,
};

interface Props {
  images: Media[];
  isFetching: boolean;
  onSelect: (image: Media) => void;
  selectedMediaIDs: string[];
}

export const ListingCH1Media = ({ images, isFetching, onSelect, selectedMediaIDs }: Props) => {
  const { media } = useMedia();
  const mediaIDs = media.map((item) => item.id);

  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <SelectableView
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)}
          style={{
            flex: 0.5,
            marginHorizontal: 2,
          }}
        >
          <Image source={{ uri: item.fileUrl }} style={fullWidthStyle} />
        </SelectableView>
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)}
          top={-2}
        >
          <MediaItemListDisplay item={item} />
        </SelectableView>
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)}
          top={200}
        >
          <MediaItemCardDisplay item={item} />
        </SelectableView>
      ),
    }),
    [mediaIDs, selectedMediaIDs, onSelect]
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ marginBottom: 150 }}>
      <ListingImages images={images as Media[]} renderItems={renderItems} />
    </View>
  );
};
