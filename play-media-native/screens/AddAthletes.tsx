import { useCallback, useState } from "react";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Listing } from "../components/Listing/Listing";
import { Athlete } from "../interfaces/athlete";
import { getAllAthletes } from "../api/queries/getAthletes";
import { useQuery } from "react-query";
import { StatusBar, View } from "react-native";
import { Button } from "react-native-paper";
import { useScrollOffset } from "../hooks/useScrollOffset/useScrollOffset";
import { theme } from "../theme/theme";
import { SelectableView } from "../components/SelectableView/SelectableView";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useAthletes } from "../hooks/useAthletes/useAthletes";

const buttonStyle = {
  borderWidth: 1,
  borderColor: theme.colors.yellow.DEFAULT,
  marginHorizontal: theme.spacing.xs,
};

const labelStyle = {
  fontFamily: theme.fontFamily.medium,
  fontSize: theme.fontSize.base,
  lineHeight: 30,
};

export const AddAthletesScreen = ({ navigation }) => {
  const { data: athletes, isFetching } = useQuery("athletes", () =>
    getAllAthletes()
  );
  const { athletes: storeAthletes, add, clear } = useAthletes();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);
  const [selectedAthleteIDs, setSelectedAthleteIDs] = useState<string[]>([]);
  const noneSelected = !selectedAthleteIDs?.length;

  const onSelect = useCallback((athlete: Athlete) => {
    setSelectedAthleteIDs((prevSelectedAthleteIDs) => {
      if (prevSelectedAthleteIDs.includes(athlete.id)) {
        return prevSelectedAthleteIDs.filter((item) => item !== athlete.id);
      }

      return [...prevSelectedAthleteIDs, athlete.id];
    });
  }, []);

  const onCancel = useCallback(() => {
    clear();
    navigation.goBack();
  }, [clear]);

  const onSubmit = useCallback(() => {
    add(athletes.filter((item) => selectedAthleteIDs.includes(item.id)));
    navigation.navigate("ReviewAthletes");
  }, [add, athletes, selectedAthleteIDs]);

  return (
    <View>
      <StatusBar barStyle={"light-content"} />
      <Listing
        data={athletes}
        isLoading={isFetching}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => onSelect(item)}
            selected={selectedAthleteIDs.includes(item.id)}
          >
            <CardAvatar item={item} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        style={{ paddingHorizontal: theme.spacing.sm }}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          disabled={noneSelected}
          mode="contained"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onSubmit}
        >
          {noneSelected ? "Add" : `Add ${selectedAthleteIDs.length}`}
        </Button>
      </BottomActions>
    </View>
  );
};
