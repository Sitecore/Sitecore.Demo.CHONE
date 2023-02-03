import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { AnimatedFAB, Text } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "../theme/theme";
import { CardShadowBox } from "../features/CardShadowBox/CardShadowBox";
import { getDate, getYear } from "../helpers/dateHelper";
import { getAccentColor, getTextColor } from "../helpers/colorHelper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { AthleteImages } from "../features/Screens/AthleteImages";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";

const pageStyles = StyleSheet.create({
  label: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
  },
  item: {
    marginBottom: theme.spacing.sm,
  },
  cardContainer: {
    marginVertical: theme.spacing.xs,
  },
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
    position: "absolute",
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
});

export const AthleteDetailScreen = ({ route, navigation }) => {
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

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
    <Screen>
      <ScrollView
        style={styles.screenPadding}
        onScroll={calcScrollOffset}
        scrollEventThrottle={0}
      >
        <View>
          <Text style={pageStyles.label}>Sport</Text>
          <Text
            style={[
              pageStyles.item,
              {
                color: getAccentColor(athlete.sport.results[0]?.title),
              },
            ]}
          >
            {athlete.sport.results[0].title}
          </Text>
        </View>
        <View>
          <Text style={pageStyles.label}>Athlete name</Text>
          <Text
            style={[
              pageStyles.item,
              {
                color: theme.colors.white.DEFAULT,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            {athlete.athleteName}
          </Text>
        </View>
        <View style={pageStyles.cardContainer}>
          <CardShadowBox color={theme.colors.black.light}>
            <View
              style={[
                pageStyles.quoteContainer,
                {
                  backgroundColor: accentColor,
                },
              ]}
            >
              <Text style={[pageStyles.quotationMark, { color: textColor }]}>
                "
              </Text>
              <Text style={[pageStyles.quote, { color: textColor }]}>
                {athlete.athleteQuote}
              </Text>
              <Text style={[pageStyles.quotationMark, { color: textColor }]}>
                "
              </Text>
            </View>
          </CardShadowBox>
        </View>
        <View style={pageStyles.cardContainer}>
          <CardShadowBox
            color={getAccentColor(athlete.sport.results[0]?.title)}
          >
            <View style={pageStyles.infoContainer}>
              <Text style={pageStyles.infoLabel}>Nationality</Text>
              <Text style={pageStyles.infoItem}>{athlete.nationality}</Text>
              <Text style={pageStyles.infoLabel}>Hobby</Text>
              <Text style={pageStyles.infoItem}>{athlete.hobby}</Text>
              <Text style={pageStyles.infoLabel}>Date of birth</Text>
              <Text style={pageStyles.infoItem}>
                {getDate(athlete.dateOfBirth)}
              </Text>
              <Text style={pageStyles.infoLabel}>Career start</Text>
              <Text style={pageStyles.infoItem}>
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
        style={pageStyles.bottomFAB}
      ></AnimatedFAB>
    </Screen>
  );
};
