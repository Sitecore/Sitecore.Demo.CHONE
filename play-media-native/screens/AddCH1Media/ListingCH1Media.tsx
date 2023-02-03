import { useMemo } from "react";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { getFileType, removeFileExtension } from "../../helpers/media";
import { ListingImages } from "../../features/ListingImages/ListingImages";
import { SelectableView } from "../../components/SelectableView/SelectableView";
import { useMedia } from "../../hooks/useMedia/useMedia";
import { useQuery } from "react-query";
import { getAllMedia } from "../../api/queries/getMedia";
import { LoadingScreen } from "../../features/LoadingScreen/LoadingScreen";
import { ListingImageDisplayType } from "../../features/SelectDisplayButtons/SelectDisplayButtons";

interface Props {
  onSelect: (image: Media) => void;
  selectedMediaIDs: string[];
}

const ListItemField = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ fontFamily: theme.fontFamily.bold }}>{`${title}:  `}</Text>
    <Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
      {value}
    </Text>
  </View>
);

const listingImagesStyle = {
  paddingHorizontal: theme.spacing.sm,
  marginBottom: 75,
};

const fullWidthStyle = {
  height: 120,
  width: "100%",
  margin: 2,
};

export const ListingCH1Media = ({ onSelect, selectedMediaIDs }: Props) => {
  const { data: images, isFetching } = useQuery("media", getAllMedia);
  const { media } = useMedia();
  const mediaIDs = media.map((item) => item.id);

  const renderItems = useMemo(
    () => ({
      [ListingImageDisplayType.GRID]: ({ item }) => (
        <SelectableView
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={
            selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)
          }
          style={{
            flex: 0.5,
            marginHorizontal: 2,
          }}
        >
          <Image source={{ uri: item.fileUrl }} style={fullWidthStyle} />
        </SelectableView>
      ),
      [ListingImageDisplayType.LIST]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={
            selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)
          }
          top={-2}
        >
          <View
            key={item.fileUrl}
            style={{
              width: "100%",
              flexDirection: "row",
              marginBottom: theme.spacing.xs,
              backgroundColor: theme.colors.black.lightest,
            }}
          >
            <Image
              style={{
                height: 110,
                width: "auto",
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
          </View>
        </SelectableView>
      ),
      [ListingImageDisplayType.CARDS]: ({ item }) => (
        <SelectableView
          onSelect={() => onSelect(item)}
          selected={
            selectedMediaIDs.includes(item.id) || mediaIDs.includes(item.id)
          }
          top={200}
        >
          <Card
            key={item.fileUrl}
            style={{
              marginBottom: theme.spacing.xs,
            }}
          >
            <Card.Cover
              style={{
                backgroundColor: theme.colors.black.lightest,
              }}
              source={{ uri: item.fileUrl }}
            />
            <Card.Content
              style={{
                backgroundColor: theme.colors.black.lightest,
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
              </View>
            </Card.Content>
          </Card>
        </SelectableView>
      ),
    }),
    [mediaIDs, selectedMediaIDs, onSelect]
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <ListingImages
      images={images as Media[]}
      renderItems={renderItems}
      style={listingImagesStyle}
    />
  );
};
