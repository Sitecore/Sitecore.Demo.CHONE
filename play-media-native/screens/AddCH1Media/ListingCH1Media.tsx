import { useMemo } from 'react';
import { View } from 'react-native';

import { SelectableView } from '../../components/SelectableView/SelectableView';
import { ListingImages } from '../../features/ListingImages/ListingImages';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { MediaItemCardDisplay } from '../../features/MediaItemCardDisplay/MediaItemCardDisplay';
import { MediaItemGridDisplay } from '../../features/MediaItemGridDisplay/MediaItemGridDisplay';
import { MediaItemListDisplay } from '../../features/MediaItemListDisplay/MediaItemListDisplay';
import { ListingImageDisplayType } from '../../features/SelectDisplayButtons/SelectDisplayButtons';
import { Media } from '../../interfaces/media';

interface Props {
  images: Media[];
  isFetching: boolean;
  onSelect: (image: Media) => void;
  selectedMediaIDs: string[];
}

export const ListingCH1Media = ({ images, isFetching, onSelect, selectedMediaIDs }: Props) => {
  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <SelectableView
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id)}
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
        >
          <MediaItemGridDisplay item={item} />
        </SelectableView>
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id)}
        >
          <MediaItemListDisplay item={item} />
        </SelectableView>
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id)}
        >
          <MediaItemCardDisplay item={item} />
        </SelectableView>
      ),
    }),
    [selectedMediaIDs, onSelect]
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, marginBottom: 140 }}>
      <ListingImages images={images as Media[]} renderItems={renderItems} />
    </View>
  );
};
