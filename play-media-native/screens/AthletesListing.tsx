import { useCallback, useMemo, useState } from "react";
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
import { getAllSports } from "../api/queries/getSports";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { AthleteFilters } from "../features/AthleteFilters/AthleteFilters";
import { Screen } from "../features/Screen/Screen";
import { useFacets } from "../hooks/useFacets/useFacets";
import { getNationalityOptions, getSportOptions } from "../helpers/facets";
import { Sport } from "../interfaces/sport";
import { ATHLETE_FACETS } from "../constants/filters";

const initializeAthletes = (athletes: Athlete[], sports: Sport[]) => {
  if (!athletes || !sports) {
    return [];
  }

  return athletes.map((item) => ({
    ...item,
    [ATHLETE_FACETS.sport]: item?.sport?.results?.length
      ? item.sport.results[0]?.id
      : null,
  }));
};

export const AthletesListingScreen = ({ navigation }) => {
  const { data: athletes, isFetching: isFetchingAthletes } = useQuery(
    "athletes",
    () => getAllAthletes(),
    {
      onSuccess: (athletes) =>
        athletes.sort((a, b) => a.athleteName!.localeCompare(b.athleteName!)),
    }
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const [facets, setFacets] = useState<Record<string, any>>({
    [ATHLETE_FACETS.sport]: "",
    [ATHLETE_FACETS.nationality]: "",
  });
  const filteredAthletes = useFacets({
    initialItems: athletes?.length ? initializeAthletes(athletes, sports) : [],
    facets,
  });
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const nationalityOptions = useMemo(
    () => getNationalityOptions(athletes),
    [athletes]
  );
  const sportOptions = useMemo(() => getSportOptions(sports), [sports]);

  const handleChange = useCallback((key: string, value: any) => {
    setFacets((prevFacets) => ({ ...prevFacets, [key]: value }));
  }, []);

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
    <Screen>
      <StatusBar barStyle={"light-content"} />
      <AthleteFilters
        filters={facets}
        nationalityOptions={nationalityOptions}
        onChange={handleChange}
        sportOptions={sportOptions}
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
    </Screen>
  );
};
