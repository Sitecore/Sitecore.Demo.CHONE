import { StyleSheet } from 'react-native';

import { theme } from '../../theme/theme';

const connectionScreenStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    maxWidth: '80%',
    textAlign: 'center',
  },
  chOneText: {
    fontFamily: theme.fontFamily.bold,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export default connectionScreenStyles;
