import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { AnimatedFAB, Text } from "react-native-paper";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { theme } from "../theme/theme";
import { CardShadowBox } from "../features/CardShadowBox/CardShadowBox";
import { getDate, getYear } from "../helpers/dateHelper";
import { getAccentColor, getTextColor } from "../helpers/colorHelper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { AthleteImages } from "../features/Screens/AthleteImages";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black.darkest,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
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
  bottomFAB: {
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
});

export const AthleteDetailScreen = ({ route, navigation }) => {
  const { isTopEdge } = useScrollOffset(true);

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

  const handleEditInfo = (id: string, title: string) => {
    navigation.navigate("EditAthleteDetails", {
      id,
      title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
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
        <AthleteImages athlete={athlete} />
      </ScrollView>
      <AnimatedFAB
        icon={({ size }) => (
          <FontAwesomeIcon
            icon={faEdit}
            color={theme.colors.black.DEFAULT}
            size={size}
          />
        )}
        label={"Edit"}
        extended={isTopEdge}
        onPress={() => handleEditInfo(athlete.id, athlete.athleteName)}
        style={styles.bottomFAB}
      ></AnimatedFAB>
    </SafeAreaView>
  );
};
