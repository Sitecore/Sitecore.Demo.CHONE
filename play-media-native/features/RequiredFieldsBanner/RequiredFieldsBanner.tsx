import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const RequiredFieldsBanner = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xs,
      }}
    >
      <Text style={{ marginLeft: theme.spacing.xs, fontStyle: 'italic' }}>
        Fields with a star (
      </Text>
      <Text style={{ color: theme.colors.yellow.DEFAULT }}>*</Text>
      <Text style={{ fontStyle: 'italic' }}>) are all required.</Text>
    </View>
  );
};