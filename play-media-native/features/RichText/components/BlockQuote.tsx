import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../../theme/theme';

interface Props {
  children: ReactNode[];
  accentColor?: string;
}

export const BlockQuote: FC<Props> = ({ children, accentColor }) => (
  <View
    style={{
      borderColor: accentColor || theme.colors.black.lightest,
      borderWidth: 1,
      borderRadius: theme.spacing.xs,
      marginVertical: theme.spacing.xs,
      padding: theme.spacing.md,
    }}
  >
    <Text
      variant="displaySmall"
      style={{
        position: 'absolute',
        top: theme.spacing.xxs,
        left: theme.spacing.xs,
      }}
    >
      “
    </Text>
    {children}
    <Text
      variant="displaySmall"
      style={{
        position: 'absolute',
        bottom: -theme.spacing.sm,
        right: theme.spacing.xs,
      }}
    >
      ”
    </Text>
  </View>
);
