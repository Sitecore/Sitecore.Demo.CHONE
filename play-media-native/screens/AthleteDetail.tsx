import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { theme } from "../theme/theme";
import { CardShadowBox } from "../features/CardShadowBox/CardShadowBox";
import { getDate, getYear } from "../helpers/dateHelper";
import { getAccentColor } from "../helpers/colorHelper";
import { ImageGrid } from "../features/ImageGrid/ImageGrid";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black.DEFAULT,
    paddingTop: theme.spacing.md,
  },
  label: {
    color: theme.colors.gray.DEFAULT,
    marginLeft: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  item: {
    marginLeft: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    fontWeight: "bold",
  },
  quoteContainer: {
    display: "flex",
    flexDirection: "row",
  },
  quotationMark: {
    color: theme.colors.white.DEFAULT,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    width: "10%",
    paddingLeft: theme.spacing.sm,
  },
  quote: {
    color: theme.colors.white.DEFAULT,
    fontSize: 20,
    fontStyle: "italic",
    width: "80%",
    paddingVertical: theme.spacing.md,
    textAlign: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.black.light,
    paddingTop: theme.spacing.xs,
  },
  infoLabel: {
    color: theme.colors.gray.DEFAULT,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.xxs,
  },
  infoItem: {
    color: theme.colors.white.DEFAULT,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  imageLabel: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  imageItem: { height: 300, width: "100%" },
});

export const AthleteDetailScreen = ({ route, navigation }) => {
  const { data, isFetching } = useQuery("athlete", () =>
    getAthleteById(route.params.id)
  );
  const athlete = data?.athlete;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (isFetching) {
    return <Text>Loading .....</Text>;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView decelerationRate={0.5}>
      <Text style={styles.label}>Sport</Text>
      <Text
        style={[
          styles.item,
          { color: getAccentColor(athlete.sport.results[0]?.title) },
        ]}
      >
        {athlete.sport.results[0].title}
      </Text>
      <Text style={styles.label}>Athlete name</Text>
      <Text
        style={[
          styles.item,
          { color: theme.colors.white.DEFAULT, marginBottom: theme.spacing.md },
        ]}
      >
        {athlete.athleteName}
      </Text>
      <View style={{ margin: theme.spacing.xs }}>
        <CardShadowBox color={theme.colors.black.light}>
          <View
            style={[
              styles.quoteContainer,
              {
                backgroundColor: getAccentColor(
                  athlete.sport.results[0]?.title
                ),
              },
            ]}
          >
            <Text style={styles.quotationMark}>"</Text>
            <Text style={styles.quote}>{athlete.athleteQuote}</Text>
            <Text style={styles.quotationMark}>"</Text>
          </View>
        </CardShadowBox>
      </View>
      <View style={{ margin: theme.spacing.xs }}>
        <CardShadowBox color={getAccentColor(athlete.sport.results[0]?.title)}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Nationality</Text>
            <Text style={styles.infoItem}>{athlete.nationality}</Text>
            <Text style={styles.infoLabel}>Hobby</Text>
            <Text style={styles.infoItem}>{athlete.hobby}</Text>
            <Text style={styles.infoLabel}>Date of birth</Text>
            <Text style={styles.infoItem}>{getDate(athlete.dateOfBirth)}</Text>
            <Text style={styles.infoLabel}>Career start</Text>
            <Text style={styles.infoItem}>
              {getYear(athlete.careerStartDate)}
            </Text>
          </View>
        </CardShadowBox>
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Profile photo</Text>
        <Image
          source={{
            uri: athlete.profilePhoto.results[0].fileUrl,
          }}
          style={styles.imageItem}
        />
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Featured image</Text>
        <Image
          source={{
            uri: athlete.featuredImage.results[0].fileUrl,
          }}
          style={styles.imageItem}
        />
      </View>
        {athlete?.relatedMedia?.results.length > 0 && (
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>Related media</Text>
            <ImageGrid
              style={styles.imageGrid}
              images={athlete.relatedMedia.results.map((img) => img.fileUrl)}
            />
          </View>
        )}
    </ScrollView>
    </SafeAreaView>
  );
};
