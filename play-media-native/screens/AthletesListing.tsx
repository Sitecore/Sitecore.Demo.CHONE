import { useCallback, useEffect, useState } from "react";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Listing } from "../components/Listing/Listing";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";
import { StatusBar } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { styles } from "../theme/styles";
import { theme } from "../theme/theme";
import { camelize } from "../helpers/textHelper";
import { getAllSports } from "../api/queries/getSports";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { AthleteFilters } from "../features/AthleteFilters/AthleteFilters";
import { useFilters } from "../hooks/useFilters/useFilters";
import { useNavigation } from "@react-navigation/native";
import { TabHeaderNavigationProp } from "../interfaces/navigators";
import { IIndexable } from "../interfaces/indexable";

export const AthletesListingScreen = () => {
  const { data: athletes, isFetching: isFetchingAthletes } = useQuery(
    "athletes",
    () => getAllAthletes()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const [filteredAthletes, setFilteredAthletes] = useState(athletes);
  const { visible } = useFilters();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const navigation = useNavigation<TabHeaderNavigationProp>();

  useEffect(() => {
    setFilteredAthletes(athletes);
  }, [athletes]);

  const handleChange = (facetValues: IIndexable) => {
    let _filteredAthletes = athletes;
    if (!!facetValues.athleteNationality) {
      _filteredAthletes = _filteredAthletes.filter((athlete) => {
        return camelize(athlete.nationality) === facetValues.athleteNationality;
      });
    }
    if (!!facetValues.athleteSport) {
      _filteredAthletes = _filteredAthletes.filter((athlete) => {
        return athlete.sport.results[0]?.id === facetValues.athleteSport;
      });
    }
    setFilteredAthletes(_filteredAthletes);
  };

  const onCardPress = useCallback((athlete: Athlete) => {
    navigation.navigate("AthleteDetail", {
      id: athlete.id,
      title: athlete.athleteName,
    });
  }, []);

  if (isFetchingAthletes || isFetchingSports) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <AthleteFilters
        athletes={athletes}
        sports={sports}
        onChange={handleChange}
        visible={visible}
      />
      <Listing
        data={filteredAthletes}
        renderItem={({ item }) => (
          <CardAvatar item={item} onCardPress={() => onCardPress(item)} />
        )}
        onScroll={calcScrollOffset}
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.sm,
        }}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Add new athlete"}
        extended={isTopEdge}
        onPress={() => navigation.navigate("AddAthlete")}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.fab}
      />
    </>
  );
};
