export const theme = {
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    white: {
      DEFAULT: '#f7f7f7',
      lighter: '#fafafa',
      light: '#ffffff',
      dark: '#efefef',
    },
    black: {
      DEFAULT: '#232323',
      light: '#3c3c3c',
      lightest: '#666666',
      dark: '#0a0a0a',
      darkest: '#000000',
      transluscent: 'rgba(0, 0, 0, 0.8)',
    },
    gray: {
      DEFAULT: '#cccccc',
      light: '#e5e5e5',
      lighter: '#d5d5d5',
      dark: '#b3b3b3',
    },
    green: {
      DEFAULT: '#08f26e',
    },
    blue: {
      DEFAULT: '#006ef9',
      light: '#3e93ff',
      lighter: '#1c80ff',
      lightest: '#85bfff',
      dark: '#0050b5',
      darkest: '#003271',
    },
    yellow: {
      DEFAULT: '#ffd31c',
      light: '#ffe060',
      lightest: '#ffeda4',
      dark: '#d7ad00',
      darkest: '#937700',
    },
    orange: {
      DEFAULT: '#ff8d00',
      light: '#ffab44',
      lightest: '#ffc988',
      dark: '#cc7000',
      darkest: '#884b00',
    },
    pink: {
      DEFAULT: '#ff1886',
      light: '#ff5caa',
      lightest: '#ffa0ce',
      dark: '#d30065',
      darkest: '#8f0044',
    },
  },
  fontFamily: {
    DEFAULT: 'Saira-Regular',
    medium: 'Saira-Medium',
    bold: 'Saira-Bold',
    italic: 'Saira-Italic',
    mono: 'Roboto-Mono',
  },
  fontSize: {
    xs: 16,
    sm: 18,
    base: 20,
    lg: 22,
    xl: 26,
    xxl: 38,
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
  sizing: {
    inputHeight: 36,
    tabBarHeight: 42,
  },
};

export const paperFontConfig = {
  fontFamily: theme.fontFamily.DEFAULT,
  default: {
    fontFamily: theme.fontFamily.DEFAULT,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.spacing.md,
  },
  headlineSmall: {
    fontFamily: theme.fontFamily.bold,
  },
  headlineMedium: {
    fontFamily: theme.fontFamily.bold,
  },
  headlineLarge: {
    fontFamily: theme.fontFamily.bold,
  },
  titleSmall: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.spacing.md,
  },
  titleMedium: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.base,
    lineHeight: theme.spacing.lg,
  },
  titleLarge: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.lg,
    lineHeight: theme.spacing.lg,
  },
  labelSmall: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.spacing.md,
  },
  labelMedium: {
    fontFamily: theme.fontFamily.DEFAULT,
    fontSize: theme.fontSize.base,
    lineHeight: theme.spacing.lg,
  },
  displaySmall: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.spacing.xxl,
  },
};

export const paperColorConfig = {
  colors: {
    primary: theme.colors.yellow.DEFAULT,
    onPrimary: theme.colors.black.darkest,
    primaryContainer: theme.colors.yellow.DEFAULT,
    onPrimaryContainer: theme.colors.black.darkest,
    secondary: theme.colors.blue.DEFAULT,
    onSecondary: theme.colors.white.DEFAULT,
    secondaryContainer: theme.colors.blue.DEFAULT,
    onSecondaryContainer: theme.colors.white.DEFAULT,
    tertiary: theme.colors.orange.DEFAULT,
    onTertiary: theme.colors.white.DEFAULT,
    tertiaryContainer: theme.colors.orange.DEFAULT,
    onTertiaryContainer: theme.colors.white.DEFAULT,
    error: theme.colors.pink.DEFAULT,
    onError: theme.colors.white.DEFAULT,
    errorContainer: theme.colors.pink.DEFAULT,
    onErrorContainer: theme.colors.white.DEFAULT,
    background: theme.colors.black.darkest,
    onBackground: theme.colors.white.DEFAULT,
    surface: theme.colors.black.darkest,
    onSurface: theme.colors.white.DEFAULT,
    surfaceVariant: theme.colors.black.light,
    onSurfaceVariant: theme.colors.white.DEFAULT,
    outline: theme.colors.yellow.DEFAULT,
    outlineVariant: theme.colors.black.darkest,
    shadow: theme.colors.black.darkest,
    scrim: theme.colors.black.darkest,
    inverseSurface: theme.colors.white.DEFAULT,
    inverseOnSurface: theme.colors.black.darkest,
    inversePrimary: theme.colors.yellow.DEFAULT,
    elevation: {
      level0: theme.colors.transparent,
      level1: theme.colors.black.lightest,
      level2: theme.colors.black.light,
      level3: theme.colors.black.DEFAULT,
      level4: theme.colors.black.dark,
      level5: theme.colors.black.darkest,
    },
    surfaceDisabled: theme.colors.black.lightest,
    onSurfaceDisabled: theme.colors.black.darkest,
    backdrop: theme.colors.black.transluscent,
  },
};

export const paperRestConfig = {
  roundness: 1,
};
