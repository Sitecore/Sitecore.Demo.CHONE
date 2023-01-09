import { useCallback } from "react";
import { CardAvatar } from "../components/CardAvatar/CardAvatar";
import { Listing } from "../components/Listing/Listing";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";
import { StatusBar } from "react-native";

export const AthletesListingScreen = ({ navigation }) => {
  const { data: athletes, isFetching } = useQuery("athletes", getAllAthletes);

  const onCardPress = useCallback((athlete: Athlete) => {
    navigation.navigate("AthleteDetail", {
      id: athlete.id,
      title: athlete.athleteName,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Listing
        data={athletes}
        isLoading={isFetching}
        renderItem={({ item }) => <CardAvatar item={item} onCardPress={() => onCardPress(item)} />}
      />
    </>
  );
};
