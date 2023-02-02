import { useCallback } from "react";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Athlete } from "../interfaces/athlete";
import { StatusBar, View } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../theme/theme";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useAthletes } from "../hooks/useAthletes/useAthletes";
import { DraggableList } from "../components/DraggableList/DraggableList";

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

export const ReviewAthletesScreen = ({ navigation }) => {
  const { athletes } = useAthletes();

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {}, []);

  return (
    <View style={{ height: "100%", backgroundColor: "black" }}>
      <StatusBar barStyle={"light-content"} />
      <DraggableList
        items={athletes}
        renderItem={(item: Athlete) => <CardAvatar item={item} />}
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
          mode="contained"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onSubmit}
        >
          Apply Changes
        </Button>
      </BottomActions>
    </View>
  );
};
