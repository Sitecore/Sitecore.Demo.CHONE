import { useCallback } from "react";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { Button } from "react-native-paper";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useAthletes } from "../hooks/useAthletes/useAthletes";
import { DraggableList } from "../components/DraggableList/DraggableList";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";

export const ReviewAthletesScreen = ({ navigation }) => {
  const { athletes } = useAthletes();

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {}, []);

  return (
    <Screen>
      <DraggableList
        items={athletes}
        renderItem={(item: Athlete) => <CardAvatar item={item} />}
        style={{ paddingBottom: 170 }}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onSubmit}
        >
          Apply Changes
        </Button>
      </BottomActions>
    </Screen>
  );
};
