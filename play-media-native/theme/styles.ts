import { Platform, StyleSheet } from 'react-native';

import { theme } from './theme';

export const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: theme.colors.yellow.DEFAULT,
    marginHorizontal: theme.spacing.xs,
  },
  buttonDisabled: {
    borderColor: theme.colors.gray.dark,
    backgroundColor: theme.colors.gray.dark,
  },
  buttonSmall: {
    borderWidth: 1,
    borderColor: theme.colors.yellow.DEFAULT,
    marginHorizontal: theme.spacing.xs,
    height: 45,
    lineHeight: 40,
  },
  buttonLabel: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.base,
    lineHeight: 30,
  },
  buttonLabelSmall: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.sm,
    lineHeight: 25,
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
  inputContainer: {
    marginTop: theme.spacing.md,
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
  responsiveImage: {
    width: '100%',
    height: undefined,
    // add this inline to the Image component
    // aspectRatio: imageWidth / imageHeight,
  },
});
