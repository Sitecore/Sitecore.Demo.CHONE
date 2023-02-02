import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "../../interfaces/navigators";
import { styles } from "../../theme/styles";

export const ReferencesView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const onAddMedia = useCallback(() => {
    navigation.navigate("AddMedia");
  }, []);

  const onAddAthletes = useCallback(() => {
    navigation.navigate("AddAthletes");
  }, []);

  const onAddEvents = useCallback(() => {
    navigation.navigate("AddEvents");
  }, []);

  return (
    <View style={{ width: "100%", justifyContent: "flex-end" }}>
      <Button
        icon="plus"
        mode="contained"
        onPress={onAddMedia}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Media
      </Button>
      <Button
        icon="plus"
        mode="contained"
        onPress={onAddAthletes}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Athletes
      </Button>
      <Button
        icon="plus"
        mode="contained"
        onPress={onAddEvents}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Events
      </Button>
    </View>
  );
};
