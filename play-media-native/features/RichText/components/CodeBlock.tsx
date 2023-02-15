import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../../theme/theme';

interface Props {
  children: ReactNode[];
}

export const CodeBlock: FC<Props> = ({ children }) => (
  <View
    style={{
      backgroundColor: theme.colors.black.lightest,
      padding: theme.spacing.sm,
      marginVertical: theme.spacing.sm,
      borderRadius: theme.spacing.xs,
    }}
  >
    <Text
      style={{
        fontFamily: theme.fontFamily.mono,
      }}
    >
      {children}
    </Text>
  </View>
);
