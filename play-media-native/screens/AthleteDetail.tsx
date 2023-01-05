import { useQuery } from "react-query";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useEffect } from "react";
import { Avatar, Text } from "react-native-paper";
import { Image, View } from "react-native";

export const AthleteDetailScreen = ({ route, navigation }) => {
  const { data: athletes, isFetching } = useQuery("athletes", getAllAthletes);
  const athlete = Array.isArray(athletes)
    ? athletes.find((item) => item.id === route.params.id)
    : undefined;

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
