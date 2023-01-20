import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { Avatar, Text } from "react-native-paper";
import { Image, View } from "react-native";

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
    <ScrollView style={styles.container} decelerationRate={0.5}>
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
      <Image
        source={{
          uri: athlete.featuredImage.results[0].fileUrl,
        }}
        style={{ height: 300, width: "100%" }}
      />
      <Avatar.Image
        size={100}
        source={{
          uri: athlete.profilePhoto.results[0].fileUrl,
        }}
      />
      <Text>{`Athlete name: ${athlete.athleteName}`}</Text>
      <Text>{`Athlete quote: ${athlete.athleteQuote}`}</Text>
    </View>
    </ScrollView>
  );
};
