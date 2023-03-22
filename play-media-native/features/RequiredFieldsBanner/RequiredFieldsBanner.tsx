import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const RequiredFieldsBanner = () => {
  return (
    <View
      style={{
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text
        style={{
          fontFamily: theme.fontFamily.italic,
          color: theme.colors.gray.DEFAULT,
        }}
      >
        Star fields are all required.
      </Text>
    </View>
  );
};
