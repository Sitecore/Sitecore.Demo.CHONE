import { useCallback, useMemo, useState } from 'react';
import { ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleProp } from 'react-native';

import { Listing } from '../../components/Listing/Listing';
import { Media } from '../../interfaces/media';
import { theme } from '../../theme/theme';
import {
  ListingImageDisplayType,
  SelectDisplayButtons,
} from '../SelectDisplayButtons/SelectDisplayButtons';

interface Props {
  images: Media[];
  onDisplayTypeChange?: (value: string) => void;
  onRefresh?: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isRefreshing?: boolean;
  renderItems: Record<ListingImageDisplayType, ListRenderItem<Media>>;
  style?: StyleProp<any>;
  showSearch?: boolean;
}

export const ListingImages = ({
  images,
  onDisplayTypeChange,
  onRefresh,
  onScroll,
  isRefreshing,
  renderItems,
  style,
}: Props) => {
  const [displayType, setDisplayType] = useState<string>(ListingImageDisplayType.GRID);

  const listStyle = useMemo(
    () => [
      {
        paddingHorizontal: theme.spacing.sm,
        marginHorizontal: displayType === ListingImageDisplayType.GRID ? -theme.spacing.xxs : 0,
      },
      style,
    ],
    [displayType, style]
  );

  const handleDisplayChange = useCallback(
    (value: string) => {
      setDisplayType(value);

      if (onDisplayTypeChange) {
        onDisplayTypeChange(value);
      }
    },
    [onDisplayTypeChange]
  );

  const imagesList = useMemo(() => {
    return (
      <Listing
        flatListKey={displayType}
        data={images}
        numColumns={displayType === ListingImageDisplayType.GRID ? 2 : 1}
        renderItem={renderItems[displayType]}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        onScroll={onScroll}
        style={listStyle}
      />
    );
  }, [displayType, images, isRefreshing, listStyle, onRefresh, onScroll, renderItems]);

  return (
    <>
      <SelectDisplayButtons displayType={displayType} onDisplayTypeChange={handleDisplayChange} />
      {imagesList}
    </>
  );
};
