import { SafeAreaView } from "react-native";
import { styles } from "../../theme/styles";

export const CenteredScreen = ({ children }) => {
  return <SafeAreaView style={styles.centeredScreen}>{children}</SafeAreaView>;
};
