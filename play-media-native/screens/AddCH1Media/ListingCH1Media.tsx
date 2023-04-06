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
import { theme } from '../../theme/theme';

interface Props {
  images: Media[];
  isFetching: boolean;
  onSelect: (image: Media) => void;
  selectedMediaIDs: string[];
  single?: boolean;
}

export const ListingCH1Media = ({
  images,
  isFetching,
  onSelect,
  selectedMediaIDs,
  single,
}: Props) => {
  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <SelectableView
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id)}
          single={single}
          right={theme.spacing.xxs + theme.spacing.xs}
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
          single={single}
        >
          <MediaItemListDisplay item={item} />
        </SelectableView>
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={selectedMediaIDs.includes(item.id)}
          single={single}
        >
          <MediaItemCardDisplay item={item} />
        </SelectableView>
      ),
    }),
    [selectedMediaIDs, single, onSelect]
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
