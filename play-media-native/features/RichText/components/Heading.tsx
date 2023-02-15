import { FC } from 'react';
import { Text } from 'react-native-paper';

import { theme } from '../../../theme/theme';

interface Props {
  children: string;
  level: number;
}

export const Heading: FC<Props> = ({ children, level }) => {
  let variant:
    | 'headlineLarge'
    | 'headlineMedium'
    | 'headlineSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'labelLarge' = 'titleSmall';

  switch (level) {
    case 1:
      variant = 'headlineLarge';
      break;
    case 2:
      variant = 'headlineMedium';
      break;
    case 3:
      variant = 'headlineSmall';
      break;
    case 4:
      variant = 'titleLarge';
      break;
    case 5:
      variant = 'titleMedium';
      break;
    default:
      variant = 'titleSmall';
  }

  return (
    <Text
      style={{
        marginVertical: theme.spacing.xs,
      }}
      variant={variant}
    >
      {children}
    </Text>
  );
};
