import { Image, View, StyleSheet } from "react-native";
import { Athlete } from "../../interfaces/athlete";
import { theme } from "../../theme/theme";
import { Button, Text } from "react-native-paper";
import { ImageGrid } from "../ImageGrid/ImageGrid";
import { styles } from "../../theme/styles";

const pageStyles = StyleSheet.create({
  imageContainer: {
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  imageLabel: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  imageItem: {
    height: 300,
    width: "100%",
    marginTop: theme.spacing.xs,
  },
  imageGrid: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  imageBtns: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: theme.spacing.sm,
  },
});

type AthleteImagesProps = {
  athlete?: Partial<Athlete>;
  isEditMode?: boolean;
  onCameraBtnPress?: () => void;
  onDeviceBtnPress?: () => void;
  onCHOneBtnPress?: () => void;
};

export const AthleteImages = ({
  athlete = {},
  isEditMode = false,
  onCameraBtnPress = undefined,
  onDeviceBtnPress = undefined,
  onCHOneBtnPress = undefined,
}: AthleteImagesProps) => {
  const imageBtns = isEditMode && (
    <View style={pageStyles.imageBtns}>
      <Button onPress={onCameraBtnPress} style={styles.button} mode="outlined">
        Camera
      </Button>
      <Button onPress={onDeviceBtnPress} style={styles.button} mode="outlined">
        Device
      </Button>
      <Button
        onPress={onCHOneBtnPress}
        style={[styles.button, { marginRight: 0 }]}
        mode="contained"
      >
        CH ONE
      </Button>
    </View>
  );

  return (
    <>
      <View style={pageStyles.imageContainer}>
        <Text style={pageStyles.imageLabel}>Profile photo</Text>
        {imageBtns}
        {athlete?.profilePhoto?.results[0]?.fileUrl && (
          <Image
            source={{
              uri: athlete.profilePhoto.results[0].fileUrl,
            }}
            style={pageStyles.imageItem}
          />
        )}
      </View>
      <View style={pageStyles.imageContainer}>
        <Text style={pageStyles.imageLabel}>Featured image</Text>
        {imageBtns}
        {athlete?.featuredImage?.results[0]?.fileUrl && (
          <Image
            source={{
              uri: athlete.featuredImage.results[0].fileUrl,
            }}
            style={pageStyles.imageItem}
          />
        )}
      </View>
      <View style={pageStyles.imageContainer}>
        <Text style={pageStyles.imageLabel}>Related media</Text>
        {imageBtns}
        {athlete?.relatedMedia?.results.length > 0 && (
          <ImageGrid
            style={pageStyles.imageGrid}
            images={athlete.relatedMedia.results.map((img) => img.fileUrl)}
          />
        )}
      </View>
    </>
  );
};
