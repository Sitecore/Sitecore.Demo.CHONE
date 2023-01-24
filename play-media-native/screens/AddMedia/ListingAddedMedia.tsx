import { useCallback, useMemo } from "react";
import { Image, StyleProp, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { getFileType, removeFileExtension } from "../../helpers/media";
import { ActionMenu } from "../../features/ActionMenu/ActionMenu";
import {
  ListingImageDisplayType,
  ListingImages,
} from "../../features/ListingImages/ListingImages";
import { StackNavigationProp } from "../../interfaces/navigators";
import { useNavigation } from "@react-navigation/native";
import { useMedia } from "../../hooks/useMedia/useMedia";
import { MEDIA_SOURCES } from "../../constants/media";
import { Icon } from "../../components/Icon/Icon";

interface Props {
  images: Media[];
}

const ListItemField = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: theme.colors.yellow.DEFAULT }}>{`${title}:  `}</Text>
    <Text>{value}</Text>
  </View>
);

const MediaSourceIcon = ({
  size = 20,
  source,
  style,
}: {
  size?: number;
  source: string;
  style?: StyleProp<any>;
}) => {
  if (source === MEDIA_SOURCES.CAMERA) {
    return <Icon name="camera-outline" size={size} style={style} />;
  }

  if (source === MEDIA_SOURCES.LIBRARY) {
    return <Icon name="folder-open-outline" size={size} style={style} />;
  }

  return <Icon name="apps-outline" size={size} style={style} />;
};

const menuStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const listingImagesStyle = {
  paddingHorizontal: theme.spacing.sm,
  marginBottom: 75,
};

const mediaSourceIconStyle = {
  position: "absolute",
  color: theme.colors.white.DEFAULT,
};

export const ListingAddedMedia = ({ images }: Props) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { remove } = useMedia();

  const editImage = useCallback(
    (image: Media) => {
      if (!image) {
        return;
      }

      navigation.navigate("EditMedia", { image });
    },
    [navigation]
  );

  const deleteImage = useCallback(
    (image: Media) => {
      if (!image) {
        return;
      }

      remove([image]);
    },
    [navigation]
  );

  const resolveActionsForItem = useCallback(
    (item: Media) => {
      return item.source !== MEDIA_SOURCES.CH_ONE
        ? [
            {
              icon: "circle-edit-outline",
              handler: () => {
                editImage(item);
              },
              title: "Edit",
            },
            {
              icon: "delete-outline",
              handler: () => {
                deleteImage(item);
              },
              title: "Delete",
            },
          ]
        : [
            {
              icon: "delete-outline",
              handler: () => {
                deleteImage(item);
              },
              title: "Delete",
            },
          ];
    },
    [editImage, deleteImage]
  );

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
          <MediaSourceIcon
            size={15}
            source={item.source}
            style={{
              ...mediaSourceIconStyle,
              top: 8,
              right: 5,
              backgroundColor: theme.colors.black.DEFAULT,
              borderRadius: 50,
              padding: 8,
            }}
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
              height: 110,
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
            <ListItemField
              title="Name"
              value={removeFileExtension(item.name)}
            />
            <ListItemField title="File type" value={getFileType(item)} />
            <ListItemField
              title="Size"
              value={`${item.fileWidth} x ${item.fileHeight}`}
            />
          </View>
          <ActionMenu
            menuItems={resolveActionsForItem(item)}
            style={menuStyle}
          />
          <MediaSourceIcon
            source={item.source}
            style={{ ...mediaSourceIconStyle, top: 10, right: 14 }}
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
              <ListItemField
                title="Name"
                value={removeFileExtension(item.name)}
              />
              <ListItemField title="Description" value={item.description} />
              <ListItemField title="File type" value={getFileType(item)} />
              <ListItemField
                title="Size"
                value={`${item.fileWidth} x ${item.fileHeight}`}
              />
              <ActionMenu
                menuItems={resolveActionsForItem(item)}
                style={menuStyle}
              />
              <MediaSourceIcon
                source={item.source}
                style={{ ...mediaSourceIconStyle, bottom: 13, right: 45 }}
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
