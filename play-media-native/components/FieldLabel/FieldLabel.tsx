import { useCallback, useMemo } from 'react';
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
  const getHeaderText = useCallback(() => {
    if (title) {
      return `${title} ${single ? '(single)' : ''}`;
    }

    return `${single ? '(single)' : ''}`;
  }, [single, title]);

  const label = useMemo(() => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text variant="labelSmall">{getHeaderText()}</Text>
        {required && (
          <>
            <Text style={{ color: theme.colors.yellow.DEFAULT, marginLeft: theme.spacing.xs }}>
              *
            </Text>
          </>
        )}
      </View>
    );
  }, [getHeaderText, required]);

  return <>{label}</>;
};
