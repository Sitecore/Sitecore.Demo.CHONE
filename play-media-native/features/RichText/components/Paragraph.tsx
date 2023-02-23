import { FC, ReactNode } from 'react';
import { Text } from 'react-native-paper';

import { theme } from '../../../theme/theme';

interface Props {
  children: ReactNode[];
}

export const Paragraph: FC<Props> = ({ children }) => (
  <Text style={{ marginVertical: theme.spacing.xxs }}>{children}</Text>
);
