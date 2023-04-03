import { Platform, StyleSheet } from 'react-native';

import { theme } from './theme';

export const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: theme.colors.yellow.DEFAULT,
    marginHorizontal: theme.spacing.xs,
    height: theme.sizing.buttonHeight,
  },
  buttonDisabled: {
    borderColor: theme.colors.black.lightest,
    backgroundColor: theme.colors.black.lightest,
  },
  buttonDisabledSecondary: {
    borderColor: theme.colors.black.lightest,
    backgroundColor: theme.colors.transparent,
  },
  buttonSmall: {
    borderWidth: 1,
    borderColor: theme.colors.yellow.DEFAULT,
    marginHorizontal: theme.spacing.xs,
    height: theme.sizing.buttonSmallHeight,
  },
  buttonLabel: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.base,
    lineHeight: 25,
  },
  buttonLabelSmall: {
    fontFamily: theme.fontFamily.DEFAULT,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.base,
    top: 2,
  },
  buttonLabelDisabledSecondary: {
    color: theme.colors.black.lightest,
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
    borderRadius: theme.spacing.xs,
  },
  inputContainer: {
    marginBottom: theme.spacing.sm,
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
    paddingBottom: theme.spacing.xs,
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
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  sportLabel: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.xxs,
    marginLeft: -theme.spacing.lg,
    marginRight: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: theme.colors.white.DEFAULT,
  },
  textInputOutline: {
    borderWidth: 0,
    borderRadius: 0,
  },
  textInputContent: {
    fontFamily: theme.fontFamily.DEFAULT,
    fontSize: theme.fontSize.sm,
    color: theme.colors.black.DEFAULT,
  },
  draggableContent: {
    marginLeft: theme.sizing.draggableHandleWidth,
    paddingLeft: 0,
  },
});
