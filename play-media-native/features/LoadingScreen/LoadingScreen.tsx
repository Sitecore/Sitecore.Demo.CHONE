import { ActivityIndicator } from "react-native-paper";
import { CenteredScreen } from "../CenteredScreen/CenteredScreen";

export const LoadingScreen = () => {
  return (
    <CenteredScreen>
      <ActivityIndicator animating={true} size="large" />
    </CenteredScreen>
  );
};
