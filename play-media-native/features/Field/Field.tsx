import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const Field = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text
      style={{
        fontFamily: theme.fontFamily.bold,
        fontSize: theme.fontSize.xxs,
        color: theme.colors.gray.DEFAULT,
        marginRight: theme.spacing.xxs,
      }}
    >
      {title}
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={{
        flex: 1,
        fontSize: theme.fontSize.xxs,
        color: theme.colors.gray.DEFAULT,
      }}
    >
      {value}
    </Text>
  </View>
);
