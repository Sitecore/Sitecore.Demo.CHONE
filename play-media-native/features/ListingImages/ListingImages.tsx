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

// const fuseOptions = {
//   keys: ['name'],
// };

export const ListingImages = ({
  images,
  onDisplayTypeChange,
  onRefresh,
  onScroll,
  isRefreshing,
  renderItems,
  style,
  showSearch = true,
}: Props) => {
  const [displayType, setDisplayType] = useState<string>(ListingImageDisplayType.LIST);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [displayedItems, setDisplayedItems] = useState(images);
  // const fuse = useMemo(() => {
  //   return new Fuse(images, fuseOptions);
  // }, [images]);

  const listStyle = useMemo(() => ({ ...listingStyle, ...style }), [style]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const search = useCallback(
  //   debounce((query: string) => {
  //     const results = !query ? images : fuse.search(query).map((item) => item.item);
  //     setDisplayedItems(results);
  //   }, 500),
  //   [fuse]
  // );

  // const onSearch = useCallback(
  //   (query: string) => {
  //     setSearchQuery(query);
  //     search(query);
  //   },
  //   [search]
  // );

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

  // const searchBar = useMemo(() => {
  //   return showSearch ? (
  //     <View
  //       style={{
  //         flexBasis: '50%',
  //         marginLeft: theme.spacing.sm,
  //       }}
  //     >
  //       <Searchbar
  //         iconColor={theme.colors.black.DEFAULT}
  //         inputStyle={{
  //           width: '100%',
  //           color: theme.colors.black.DEFAULT,
  //         }}
  //         placeholder="Search"
  //         placeholderTextColor={theme.colors.black.DEFAULT}
  //         onChangeText={onSearch}
  //         value={searchQuery}
  //         style={{
  //           backgroundColor: theme.colors.white.DEFAULT,
  //           color: theme.colors.black.DEFAULT,
  //           width: '100%',
  //         }}
  //       />
  //     </View>
  //   ) : (
  //     <></>
  //   );
  // }, [onSearch, searchQuery, showSearch]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.sm,
        }}
      >
        {/* {searchBar} */}
        <SelectDisplayButtons displayType={displayType} onDisplayTypeChange={handleDisplayChange} />
      </View>
      {imagesList}
    </>
  );
};
