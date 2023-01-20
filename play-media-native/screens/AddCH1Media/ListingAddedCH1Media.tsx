import { useMemo } from "react";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { getFileTypeFromURL } from "../../helpers/media";
import {
  ListingImageDisplayType,
  ListingImages,
} from "../../features/ListingImages/ListingImages";
import { SelectableImage } from "../../components/SelectableImage/SelectableImage";
import { useMedia } from "../../hooks/useMedia/useMedia";

interface Props {
  images: Media[];
  onSelect: (image: Media) => void;
  selectedMedia: Media[];
}

const ListItemField = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: theme.colors.yellow.DEFAULT }}>{`${title}:  `}</Text>
    <Text>{value}</Text>
  </View>
);

const listingImagesStyle = {
  paddingHorizontal: theme.spacing.sm,
  marginBottom: 75,
};

const fullWidthStyle = {
  height: 120,
  width: "100%",
  margin: theme.spacing.xxs,
  borderRadius: theme.spacing.xxs,
};

export const ListingAddedCH1Media = ({
  images,
  onSelect,
  selectedMedia,
}: Props) => {
  const { media } = useMedia();
  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <SelectableImage
          key={item.id}
          containerStyle={{ width: "50%" }}
          onSelect={() => onSelect(item)}
          selected={selectedMedia.includes(item) || media.includes(item)}
          uri={item.fileUrl}
          style={fullWidthStyle}
        />
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
            </View>
          </Card.Content>
        </Card>
      ),
    }),
    [selectedMedia]
  );

  return (
    <ListingImages
      images={images}
      renderItems={renderItems}
      style={listingImagesStyle}
    />
  );
};
