import { useEffect, useState } from "react";
import { FacetFilters } from "../../components/FacetFilters/FacetFilters";
import { camelize } from "../../helpers/textHelper";
import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";
import { Athlete } from "../../interfaces/athlete";
import { Sport } from "../../interfaces/sport";
import { View } from "react-native";
import { styles } from "../../theme/styles";
import { theme } from "../../theme/theme";
import { useFilters } from "../../hooks/useFilters/useFilters";
import { IIndexable } from "../../interfaces/indexable";

export const AthleteFilters = ({
  athletes,
  sports,
  onChange,
  visible = true,
}: {
  athletes: Athlete[];
  sports: Sport[];
  onChange: (facetValues: IIndexable) => void;
  visible?: boolean;
}) => {
  const [nationalityFacets, setNationalityFacets] = useState([]);
  const [sportFacets, setSportFacets] = useState([]);

  const [facetValues, setFacetValues] = useState<IIndexable>({
    athleteNationality: "",
    athleteSport: "",
  });

  const { setAthleteFiltersActive } = useFilters();

  useEffect(() => {
    const nationalities = Array.from(
      new Set(athletes?.map((athlete) => athlete.nationality).filter((n) => n))
    );
    setNationalityFacets(
      nationalities.map((nationality) => ({
        label: nationality,
        value: camelize(nationality),
      }))
    );
  }, [athletes]);

  useEffect(() => {
    if (!sports) return;
    setSportFacets(
      sports?.map((sport) => ({ label: sport.title, value: sport.id }))
    );
  }, [sports]);

  const handleFacetsChange = (id: string, item: DropdownItem) => {
    const newFacetValues = facetValues;
    newFacetValues[id] = item.value;
    const activeFilters = Object.values(newFacetValues).filter(
      (val) => val !== ""
    ).length;
    setAthleteFiltersActive(activeFilters);
    setFacetValues({ ...newFacetValues });
    onChange(facetValues);
  };

  return (
    <View
      style={[
        styles.container,
        {
          display: visible ? "flex" : "none",
          paddingBottom: theme.spacing.sm,
          zIndex: 10,
        },
      ]}
    >
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
    </View>
  );
};
