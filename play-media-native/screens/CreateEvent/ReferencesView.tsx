import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { MediaPicker } from "../../components/MediaPicker/MediaPicker";
import { StackNavigationProp } from "../../interfaces/navigators";

export const ReferencesView = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const onAddMedia = useCallback(() => {
    navigation.navigate("AddMedia");
  }, []);

  return (
    <View>
      <Button icon="plus" mode="contained" onPress={onAddMedia}>
        Media
      </Button>
    </View>
  );
};
