import { useCallback, useMemo, useState } from 'react';
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  View,
} from 'react-native';

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

const listingStyle = {
  paddingHorizontal: theme.spacing.sm,
};

export const ListingImages = ({
  images,
  onDisplayTypeChange,
  onRefresh,
  onScroll,
  isRefreshing,
  renderItems,
  style,
}: Props) => {
  const [displayType, setDisplayType] = useState<string>(ListingImageDisplayType.LIST);

  const listStyle = useMemo(() => ({ ...listingStyle, ...style }), [style]);

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.sm,
        }}
      >
        <SelectDisplayButtons displayType={displayType} onDisplayTypeChange={handleDisplayChange} />
      </View>
      {imagesList}
    </>
  );
};
