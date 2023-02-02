import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const athleteStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black.darkest,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  button: {
    position: "absolute",
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  label: {
    color: theme.colors.white.DEFAULT,
    marginBottom: theme.spacing.xxs,
  },
  item: {
    marginBottom: theme.spacing.xs,
  },
  textInput: {
    height: 37,
    backgroundColor: theme.colors.white.DEFAULT,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});
