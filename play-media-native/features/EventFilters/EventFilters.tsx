import { useEffect, useState } from "react";
import { FacetFilters } from "../../components/FacetFilters/FacetFilters";
import { camelize } from "../../helpers/textHelper";
import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";
import { Sport } from "../../interfaces/sport";
import { Event } from "../../interfaces/event";
import { Platform, View } from "react-native";
import { theme } from "../../theme/theme";
import { useFilters } from "../../hooks/useFilters/useFilters";
import { IIndexable } from "../../interfaces/indexable";

export const EventFilters = ({
  events,
  sports,
  onChange,
  visible = true,
}: {
  events: Event[];
  sports: Sport[];
  onChange: (facetValues: IIndexable) => void;
  visible?: boolean;
}) => {
  const [locationFacets, setLocationFacets] = useState([]);
  const [sportFacets, setSportFacets] = useState([]);

  const [facetValues, setFacetValues] = useState<IIndexable>({
    eventLocation: "",
    eventSport: "",
  });

  const { setEventFiltersActive } = useFilters();

  useEffect(() => {
    const nationalities = Array.from(
      new Set(events?.map((event) => event.location).filter((n) => n))
    );
    setLocationFacets(
      nationalities.map((nationality) => ({
        label: nationality,
        value: camelize(nationality),
      }))
    );
  }, [events]);

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
    setEventFiltersActive(activeFilters);
    setFacetValues({ ...newFacetValues });
    onChange(facetValues);
  };

  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        paddingHorizontal: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        ...(Platform.OS !== "android" && {
          zIndex: 10,
        }),
      }}
    >
      <FacetFilters
        facetFilters={[
          {
            id: "eventLocation",
            label: "Location",
            facets: [{ label: "All", value: "" }, ...locationFacets] || [],
          },
          {
            id: "eventSport",
            label: "Sport",
            facets: [{ label: "All", value: "" }, ...sportFacets] || [],
          },
        ]}
        onChange={handleFacetsChange}
      />
    </View>
  );
};
