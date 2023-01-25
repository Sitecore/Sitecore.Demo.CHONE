import { ActivityIndicator } from "react-native-paper";
import { Screen } from "../Screen/Screen";

export const LoadingScreen = () => {
  return (
    <Screen centered>
      <ActivityIndicator animating={true} size="large" />
    </Screen>
  );
};
