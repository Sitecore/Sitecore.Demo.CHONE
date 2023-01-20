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
    <View>
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
  );
};
