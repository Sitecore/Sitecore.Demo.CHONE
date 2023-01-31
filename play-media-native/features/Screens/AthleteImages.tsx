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
  button: {
    position: "absolute",
    right: -theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
});

type AthleteImagesProps = {
  athlete: Partial<Athlete>;
  isEditMode?: boolean;
  onAddBtnPress?: () => void;
};

export const AthleteImages = ({
  athlete,
  isEditMode = false,
  onAddBtnPress = undefined,
}: AthleteImagesProps) => {
  const addBtn = isEditMode && (
    <Button
      icon={"plus"}
      onPress={onAddBtnPress}
      style={[styles.button, pageStyles.button]}
      mode="contained"
    >
      Add
    </Button>
  );

  return (
    <>
      {athlete?.profilePhoto?.results[0]?.fileUrl && (
        <View style={pageStyles.imageContainer}>
          <Text style={pageStyles.imageLabel}>Profile photo</Text>
          <Image
            source={{
              uri: athlete.profilePhoto.results[0].fileUrl,
            }}
            style={pageStyles.imageItem}
          />
          {addBtn}
        </View>
      )}
      {athlete?.featuredImage?.results[0]?.fileUrl && (
        <View style={pageStyles.imageContainer}>
          <Text style={pageStyles.imageLabel}>Featured image</Text>
          <Image
            source={{
              uri: athlete.featuredImage.results[0].fileUrl,
            }}
            style={pageStyles.imageItem}
          />
          {addBtn}
        </View>
      )}
      {athlete?.relatedMedia?.results.length > 0 && (
        <View style={pageStyles.imageContainer}>
          <Text style={pageStyles.imageLabel}>Related media</Text>
          <ImageGrid
            style={pageStyles.imageGrid}
            images={athlete.relatedMedia.results.map((img) => img.fileUrl)}
          />
          {addBtn}
        </View>
      )}
    </>
  );
};
