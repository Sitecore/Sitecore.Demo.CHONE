import { useCallback } from "react";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Listing } from "../components/Listing/Listing";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";
import { StatusBar } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { defaultStyle } from "../components/BottomFAB/BottomFAB";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";

export const AthletesListingScreen = ({ navigation }) => {
  const { data: athletes, isFetching } = useQuery("athletes", () =>
    getAllAthletes()
  );
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

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
        renderItem={({ item }) => (
          <CardAvatar item={item} onCardPress={() => onCardPress(item)} />
        )}
        onScroll={calcScrollOffset}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Add new athlete"}
        extended={isTopEdge}
        onPress={() => navigation.navigate("AddAthlete")}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={defaultStyle.fab}
      />
    </>
  );
};
