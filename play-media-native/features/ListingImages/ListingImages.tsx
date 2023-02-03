import { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleProp, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import Fuse from "fuse.js";
import {
  ListingImageDisplayType,
  SelectDisplayButtons,
} from "../SelectDisplayButtons/SelectDisplayButtons";
import debounce from "lodash.debounce";

interface Props {
  images: Media[];
  onDisplayTypeChange?: (value: string) => void;
  renderItems: Record<ListingImageDisplayType, ListRenderItem<Media>>;
  style?: StyleProp<any>;
}

const listingStyle = {
  paddingHorizontal: theme.spacing.sm,
};

const fuseOptions = {
  keys: ["name"],
};

export const ListingImages = ({
  images,
  onDisplayTypeChange,
  renderItems,
  style,
}: Props) => {
  const [displayType, setDisplayType] = useState<string>(
    ListingImageDisplayType.LIST
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState(images);
  const fuse = useMemo(() => {
    return new Fuse(images, fuseOptions);
  }, [images]);

  const listStyle = useMemo(() => ({ ...listingStyle, ...style }), [style]);

  const search = useCallback(
    debounce((query: string) => {
      const results = !query
        ? images
        : fuse.search(query).map((item) => item.item);
      setDisplayedItems(results);
    }, 500),
    [fuse]
  );

  const onSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      search(query);
    },
    [search, fuse]
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

  const renderList = useCallback(
    (items: Media[], displayValue: string) => {
      if (displayValue === ListingImageDisplayType.GRID) {
        return (
          <FlatList
            key={ListingImageDisplayType.GRID}
            numColumns={2}
            style={listStyle}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItems[ListingImageDisplayType.GRID]}
          />
        );
      }

      if (displayValue === ListingImageDisplayType.LIST) {
        return (
          <FlatList
            key={ListingImageDisplayType.LIST}
            style={listStyle}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItems[ListingImageDisplayType.LIST]}
          />
        );
      }

      return (
        <FlatList
          key={ListingImageDisplayType.CARDS}
          style={listStyle}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItems[ListingImageDisplayType.CARDS]}
        />
      );
    },
    [renderItems]
  );

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: theme.spacing.sm,
        }}
      >
        <View
          style={{
            flexBasis: "50%",
            marginLeft: theme.spacing.sm,
          }}
        >
          <Searchbar
            iconColor={theme.colors.black.DEFAULT}
            inputStyle={{
              width: "100%",
              color: theme.colors.black.DEFAULT,
            }}
            placeholder="Search"
            placeholderTextColor={theme.colors.black.DEFAULT}
            onChangeText={onSearch}
            value={searchQuery}
            style={{
              backgroundColor: theme.colors.white.DEFAULT,
              color: theme.colors.black.DEFAULT,
              width: "100%",
            }}
          />
        </View>
        <SelectDisplayButtons
          displayType={displayType}
          onDisplayTypeChange={handleDisplayChange}
        />
      </View>
      {renderList(displayedItems, displayType)}
    </>
  );
};
