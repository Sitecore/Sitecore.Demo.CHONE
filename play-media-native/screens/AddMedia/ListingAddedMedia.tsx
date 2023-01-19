import { useCallback, useMemo } from "react";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { getFileTypeFromURL } from "../../helpers/media";
import { ActionMenu } from "../../features/ActionMenu/ActionMenu";
import {
  ListingImageDisplayType,
  ListingImages,
} from "../../features/ListingImages/ListingImages";

interface Props {
  images: Media[];
}

const ListItemField = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: theme.colors.yellow.DEFAULT }}>{`${title}:  `}</Text>
    <Text>{value}</Text>
  </View>
);

const menuStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const listingImagesStyle = {
  paddingHorizontal: theme.spacing.sm,
  marginBottom: 75,
};

export const ListingAddedMedia = ({ images }: Props) => {
  const resolveActionsForItem = useCallback((item: Media) => {
    return [
      {
        icon: "circle-edit-outline",
        handler: () => {
          console.log("item", item);
        },
        title: "Edit",
      },
      {
        icon: "delete-outline",
        handler: () => {
          console.log("item", item);
        },
        title: "Delete",
      },
    ];
  }, []);

  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <View key={item.fileUrl} style={{ width: "50%" }}>
          <Image
            style={{
              height: 120,
              margin: theme.spacing.xxs,
              borderRadius: theme.spacing.xxs,
            }}
            source={{ uri: item.fileUrl }}
          />
          <ActionMenu
            iconColor={theme.colors.black.DEFAULT}
            iconSize={15}
            menuItems={resolveActionsForItem(item)}
            style={menuStyle}
          />
        </View>
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => (
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
          <ActionMenu
            menuItems={resolveActionsForItem(item)}
            style={menuStyle}
          />
        </View>
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <Card
          key={item.fileUrl}
          style={{
            marginBottom: theme.spacing.xs,
            borderWidth: 1,
            borderColor: theme.colors.yellow.DEFAULT,
          }}
        >
          <Card.Cover
            style={{
              backgroundColor: theme.colors.black.DEFAULT,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            source={{ uri: item.fileUrl }}
          />
          <Card.Content
            style={{
              backgroundColor: theme.colors.black.darkest,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingBottom: 0,
              paddingRight: 0,
              paddingTop: 0,
            }}
          >
            <View style={{ position: "relative", width: "100%" }}>
              <ListItemField title="Name" value={item.fileName} />
              <ListItemField title="Description" value={item.description} />
              <ListItemField
                title="File type"
                value={getFileTypeFromURL(item.fileUrl)}
              />
              <ListItemField
                title="Dimensions"
                value={`${item.fileWidth} x ${item.fileHeight}`}
              />
              <ActionMenu
                menuItems={resolveActionsForItem(item)}
                style={menuStyle}
              />
            </View>
          </Card.Content>
        </Card>
      ),
    }),
    [resolveActionsForItem]
  );

  return (
    <ListingImages
      images={images}
      renderItems={renderItems}
      style={listingImagesStyle}
    />
  );
};
