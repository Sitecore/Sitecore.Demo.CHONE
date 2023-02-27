import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Icon } from '../../components/Icon/Icon';
import { theme } from '../../theme/theme';

export const RequiredFieldsBanner = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.yellow.DEFAULT,
        borderBottomWidth: 1,
        padding: theme.spacing.xs,
      }}
    >
      <Icon name="warning-outline" color={theme.colors.yellow.DEFAULT} size={16} />
      <Text style={{ marginLeft: theme.spacing.xs }}>Make sure all required (</Text>
      <Text style={{ color: theme.colors.yellow.DEFAULT }}>*</Text>
      <Text>) fields have a value!</Text>
    </View>
  );
};
