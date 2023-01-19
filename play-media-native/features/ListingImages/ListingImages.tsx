import { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleProp, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";

export interface DisplayTypeOption {
  icon: string;
  label: string;
  value: string;
}

export enum ListingImageDisplayType {
  GRID = "grid",
  LIST = "list",
  CARDS = "cards",
}

interface Props {
  images: Media[];
  onDisplayTypeChange?: (value: string) => void;
  renderItems: Record<ListingImageDisplayType, ListRenderItem<Media>>;
  style?: StyleProp<any>;
}

const SEGMENTED_BUTTON_ITEMS = [
  { value: ListingImageDisplayType.GRID, icon: "view-grid", label: "Grid" },
  { value: ListingImageDisplayType.LIST, icon: "view-list", label: "List" },
  { value: ListingImageDisplayType.CARDS, icon: "cards", label: "Cards" },
];

const listingStyle = {
  paddingHorizontal: theme.spacing.sm,
};

export const ListingImages = ({
  images,
  onDisplayTypeChange,
  renderItems,
  style,
}: Props) => {
  const [displayType, setDisplayType] = useState<string>(
    ListingImageDisplayType.GRID
  );

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
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SegmentedButtons
          buttons={SEGMENTED_BUTTON_ITEMS}
          density="small"
          onValueChange={handleDisplayChange}
          style={{
            width: 300,
            marginBottom: theme.spacing.sm,
            marginHorizontal: "auto",
          }}
          value={displayType}
        />
      </View>
      {renderList(images, displayType)}
    </>
  );
};
