import { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const FieldLabel = ({
  required,
  single = false,
  title,
}: {
  required?: boolean;
  single?: boolean;
  title: string;
}) => {
  const label = useMemo(() => {
    const headerText = `${title} ${single ? '(single)' : ''}`;

    return (
      <View style={{ flexDirection: 'row' }}>
        <Text variant="labelSmall">{headerText}</Text>
        {required && (
          <>
            <Text style={{ color: theme.colors.yellow.DEFAULT, marginLeft: theme.spacing.xs }}>
              *
            </Text>
          </>
        )}
      </View>
    );
  }, [title, required, single]);

  return <>{label}</>;
};
