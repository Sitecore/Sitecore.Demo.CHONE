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
import { FacetFilters } from "../components/FacetFilters/FacetFilters";
import { camelize } from "../helpers/textHelper";
import { getAllSports } from "../api/queries/getSports";
import { DropdownItem } from "../components/DropdownPicker/DropdownPicker";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";

export interface IIndexable {
  [key: string]: any;
}

export const AthletesListingScreen = ({ navigation }) => {
  const { data: athletes, isFetching: isFetchingAthletes } = useQuery(
    "athletes",
    () => getAllAthletes()
  );
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const [facetValues, setFacetValues] = useState<IIndexable>({
    athleteNationality: "",
    athleteSport: "",
  });

  const nationalityFacets = useMemo(() => {
    const nationalities = Array.from(
      new Set(athletes?.map((athlete) => athlete.nationality).filter((n) => n))
    );

    return nationalities.map((nationality) => ({
      label: nationality,
      value: camelize(nationality),
    }));
  }, [athletes]);

  const sportFacets = useMemo(() => {
    if (!sports) return;
    return sports?.map((sport) => ({ label: sport.title, value: sport.id }));
  }, [sports]);

  const filteredAthletes = useMemo(() => {
    let filteredAthletes = athletes;
    if (!!facetValues.athleteNationality) {
      filteredAthletes = filteredAthletes.filter((athlete) => {
        return camelize(athlete.nationality) === facetValues.athleteNationality;
      });
    }
    if (!!facetValues.athleteSport) {
      filteredAthletes = filteredAthletes.filter((athlete) => {
        return athlete.sport.results[0]?.id === facetValues.athleteSport;
      });
    }
    return filteredAthletes;
  }, [facetValues, athletes]);

  const handleFacetsChange = (id: string, item: DropdownItem) => {
    const newFacetValues = facetValues;
    newFacetValues[id] = item.value;

    setFacetValues({ ...newFacetValues });
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
      <FacetFilters
        facetFilters={[
          {
            id: "athleteNationality",
            label: "Nationality",
            facets: [{ label: "All", value: "" }, ...nationalityFacets] || [],
          },
          {
            id: "athleteSport",
            label: "Sport",
            facets: [{ label: "All", value: "" }, ...sportFacets] || [],
          },
        ]}
        onChange={handleFacetsChange}
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
