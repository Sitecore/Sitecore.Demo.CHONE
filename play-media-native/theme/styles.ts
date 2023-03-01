import { Platform, StyleSheet } from 'react-native';

import { theme } from './theme';

export const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: theme.colors.yellow.DEFAULT,
    marginHorizontal: theme.spacing.xs,
  },
  buttonLabel: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.base,
    lineHeight: 30,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.colors.black.darkest,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.xs,
    right: theme.spacing.xs,
    bottom: theme.spacing.xs,
  },
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.black.darkest,
  },
  screenPadding: {
    paddingHorizontal: theme.spacing.sm,
  },
  facetFilters: {
    display: 'flex',
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    ...(Platform.OS === 'ios' && {
      zIndex: 10,
    }),
  },
});
