import { useCallback, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { getFileTypeFromURL } from "../../helpers/media";

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
}

const SEGMENTED_BUTTON_ITEMS = [
  { value: ListingImageDisplayType.GRID, icon: "view-grid", label: "Grid" },
  { value: ListingImageDisplayType.LIST, icon: "view-list", label: "List" },
  { value: ListingImageDisplayType.CARDS, icon: "cards", label: "Cards" },
];

const ListItemField = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: theme.colors.yellow.DEFAULT }}>{`${title}:  `}</Text>
    <Text>{value}</Text>
  </View>
);

export const ListingImages = ({ images, onDisplayTypeChange }: Props) => {
  const [displayType, setDisplayType] = useState<string>(
    ListingImageDisplayType.GRID
  );

  const handleDisplayChange = useCallback(
    (value: string) => {
      console.log("value", value);

      setDisplayType(value);

      if (onDisplayTypeChange) {
        onDisplayTypeChange(value);
      }
    },
    [onDisplayTypeChange]
  );

  const renderList = useCallback((items: Media[], displayValue: string) => {
    if (displayValue === ListingImageDisplayType.GRID) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {items.map((item) => (
            <View key={item.fileUrl} style={{ width: "50%" }}>
              <Image
                key={item.fileUrl}
                style={{
                  height: 120,
                  margin: theme.spacing.xxs,
                  borderRadius: theme.spacing.xxs,
                }}
                source={{ uri: item.fileUrl }}
              />
            </View>
          ))}
        </View>
      );
    }

    if (displayValue === ListingImageDisplayType.LIST) {
      return (
        <View style={{ width: "100%" }}>
          {items.map((item) => (
            <View
              key={item.fileUrl}
              style={{
                width: "100%",
                flexDirection: "row",
                borderColor: theme.colors.yellow.DEFAULT,
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: theme.spacing.xs,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: "auto",
                  margin: theme.spacing.xxs,
                  borderRadius: theme.spacing.xxs,
                  flex: 1,
                }}
                source={{ uri: item.fileUrl }}
              />
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  marginLeft: theme.spacing.xs,
                }}
              >
                <ListItemField title="Name" value={item.fileName} />
                <ListItemField
                  title="File type"
                  value={getFileTypeFromURL(item.fileUrl)}
                />
                <ListItemField
                  title="Dimensions"
                  value={`${item.fileWidth} x ${item.fileHeight}`}
                />
              </View>
            </View>
          ))}
        </View>
      );
    }

    return (
      // <View style={{ width: "100%" }}>
      //   {items.map((item) => (
      //     <Image
      //       key={item.fileUrl}
      //       style={{
      //         height: 200,
      //         width: "auto",
      //         margin: theme.spacing.xxs,
      //         borderRadius: theme.spacing.xxs,
      //       }}
      //       source={{ uri: item.fileUrl }}
      //     />
      //   ))}
      // </View>
      <View
        style={{
          width: "100%",
          borderColor: theme.colors.yellow.DEFAULT,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        {items.map((item) => (
          <Card>
            <Card.Cover source={{ uri: item.fileUrl }} />
            <Card.Content
              style={{
                backgroundColor: "black",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <Text variant="bodyLarge">Card title</Text>
              <Text variant="bodyLarge">Card content</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    );

    // if (displayValue === ListingImageDisplayType.LIST) {
    //   return (
    //     <View style={{ width: "100%" }}>
    //       {items.map((item) => (
    //         <Image
    //           key={item.name}
    //           style={{
    //             height: 200,
    //             width: "auto",
    //             margin: theme.spacing.xxs,
    //             borderRadius: theme.spacing.xxs,
    //           }}
    //           source={{ uri: item.fileUrl }}
    //         />
    //       ))}
    //     </View>
    //   );
    // }
  }, []);

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SegmentedButtons
          buttons={SEGMENTED_BUTTON_ITEMS}
          density="small"
          onValueChange={handleDisplayChange}
          style={{ width: 300, marginBottom: theme.spacing.sm }}
          value={displayType}
        />
      </View>
      {renderList(images, displayType)}
    </>
  );
};
