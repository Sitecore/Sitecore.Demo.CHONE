import { useCallback } from "react";
import { CardAvatar } from "../components/CardAvatar/CardAvatar";
import { Listing } from "../components/Listing/Listing";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";

export const AthletesListingScreen = ({ navigation }) => {
  const { data: athletes, isFetching } = useQuery("athletes", getAllAthletes);

  const onCardPress = useCallback((athlete: Athlete) => {
    navigation.navigate("AthleteDetail", {
      id: athlete.id,
      title: athlete.athleteName,
    });
  }, []);

  return (
    <Listing
      data={athletes}
      isLoading={isFetching}
      renderItem={({ item }) => (
        <CardAvatar item={item} onCardPress={() => onCardPress(item)} />
      )}
    />
  );
};
