import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const styles = StyleSheet.create({
  centeredScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: theme.colors.black.darkest,
  },
  container: {
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.black.darkest,
  },
  fab: {
    position: "absolute",
    margin: theme.spacing.xs,
    right: theme.spacing.xs,
    bottom: theme.spacing.xs,
  },
});
