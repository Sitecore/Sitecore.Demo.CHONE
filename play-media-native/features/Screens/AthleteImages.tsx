import { Image, View, StyleSheet } from "react-native";
import { Athlete } from "../../interfaces/athlete";
import { theme } from "../../theme/theme";
import { AnimatedFAB, Text } from "react-native-paper";
import { ImageGrid } from "../ImageGrid/ImageGrid";
import { useScrollOffset } from "../../hooks/useScrollOffset/useScrollOffset";

const styles = StyleSheet.create({
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
  },
  addButton: {
    position: "absolute",
    right: theme.spacing.xxs,
    marginBottom: theme.spacing.lg,
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
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  const addBtn = isEditMode && (
    <AnimatedFAB
      icon={"plus"}
      label={"Add"}
      extended={isTopEdge}
      onPress={onAddBtnPress}
      style={styles.addButton}
    />
  );

  return (
    <>
      {athlete?.profilePhoto?.results[0]?.fileUrl && (
        <View style={styles.imageContainer}>
          {addBtn}
          <Text style={styles.imageLabel}>Profile photo</Text>
          <Image
            source={{
              uri: athlete.profilePhoto.results[0].fileUrl,
            }}
            style={styles.imageItem}
          />
        </View>
      )}
      {athlete?.featuredImage?.results[0]?.fileUrl && (
        <View style={styles.imageContainer}>
          {addBtn}
          <Text style={styles.imageLabel}>Featured image</Text>
          <Image
            source={{
              uri: athlete.featuredImage.results[0].fileUrl,
            }}
            style={styles.imageItem}
          />
        </View>
      )}
      {athlete?.relatedMedia?.results.length > 0 && (
        <View style={styles.imageContainer}>
          {addBtn}
          <Text style={styles.imageLabel}>Related media</Text>
          <ImageGrid
            style={styles.imageGrid}
            images={athlete.relatedMedia.results.map((img) => img.fileUrl)}
          />
        </View>
      )}
    </>
  );
};
