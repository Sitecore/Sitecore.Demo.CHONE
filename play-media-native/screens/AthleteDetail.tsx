import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { Button, Text } from "react-native-paper";
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
import { getAccentColor, getTextColor } from "../helpers/colorHelper";
import { ImageGrid } from "../features/ImageGrid/ImageGrid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black.darkest,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  button: {
    position: "absolute",
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  label: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  item: {
    marginBottom: theme.spacing.xs,
    fontFamily: theme.fontFamily.bold,
  },
  cardContainer: { marginVertical: theme.spacing.xs },
  quoteContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.xs,
  },
  quotationMark: {
    fontSize: 80,
    fontFamily: theme.fontFamily.italic,
    textAlign: "center",
    lineHeight: 100,
    flexBasis: "15%",
  },
  quote: {
    fontSize: theme.fontSize.lg,
    lineHeight: theme.spacing.lg,
    fontFamily: theme.fontFamily.italic,
    flexBasis: "70%",
    paddingVertical: theme.spacing.lg,
    textAlign: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.black.light,
    paddingTop: theme.spacing.sm,
  },
  infoLabel: {
    color: theme.colors.gray.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.xxs,
  },
  infoItem: {
    color: theme.colors.white.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontFamily: theme.fontFamily.bold,
  },
  imageContainer: {
    marginBottom: theme.spacing.md,
  },
  imageLabel: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  imageItem: { height: 300, width: "100%", marginTop: theme.spacing.xs },
  imageGrid: {
    marginTop: theme.spacing.xs,
  },
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
    return <LoadingScreen />;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  const accentColor =
    getAccentColor(athlete?.sport?.results[0]?.title) ||
    theme.colors.gray.DEFAULT;
  const textColor = getTextColor(accentColor) || theme.colors.white.DEFAULT;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView decelerationRate={0.5}>
        <View>
          <Button
            style={styles.button}
            textColor={theme.colors.yellow.DEFAULT}
            icon={({ size }) => (
              <FontAwesomeIcon
                icon={faEdit}
                color={theme.colors.yellow.DEFAULT}
                size={size}
              />
            )}
          >
            Change
          </Button>
          <Text style={styles.label}>Sport</Text>
          <Text
            style={[
              styles.item,
              {
                color: getAccentColor(athlete.sport.results[0]?.title),
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            {athlete.sport.results[0].title}
          </Text>
        </View>
        <View>
          <Button
            style={styles.button}
            textColor={theme.colors.yellow.DEFAULT}
            icon={({ size }) => (
              <FontAwesomeIcon
                icon={faEdit}
                color={theme.colors.yellow.DEFAULT}
                size={size}
              />
            )}
          >
            Edit info
          </Button>
          <Text style={styles.label}>Athlete name</Text>
          <Text
            style={[
              styles.item,
              {
                color: theme.colors.white.DEFAULT,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            {athlete.athleteName}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <CardShadowBox color={theme.colors.black.light}>
            <View
              style={[
                styles.quoteContainer,
                {
                  backgroundColor: accentColor,
                },
              ]}
            >
              <Text style={[styles.quotationMark, { color: textColor }]}>
                "
              </Text>
              <Text style={[styles.quote, { color: textColor }]}>
                {athlete.athleteQuote}
              </Text>
              <Text style={[styles.quotationMark, { color: textColor }]}>
                "
              </Text>
            </View>
          </CardShadowBox>
        </View>
        <View style={styles.cardContainer}>
          <CardShadowBox
            color={getAccentColor(athlete.sport.results[0]?.title)}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <Text style={styles.infoItem}>{athlete.nationality}</Text>
              <Text style={styles.infoLabel}>Hobby</Text>
              <Text style={styles.infoItem}>{athlete.hobby}</Text>
              <Text style={styles.infoLabel}>Date of birth</Text>
              <Text style={styles.infoItem}>
                {getDate(athlete.dateOfBirth)}
              </Text>
              <Text style={styles.infoLabel}>Career start</Text>
              <Text style={styles.infoItem}>
                {getYear(athlete.careerStartDate)}
              </Text>
            </View>
          </CardShadowBox>
        </View>
        {athlete?.profilePhoto?.results[0]?.fileUrl && (
          <View style={styles.imageContainer}>
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
