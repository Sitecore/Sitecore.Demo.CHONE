import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const AvatarImage = ({ size, color, uri }: { size: number; color: string; uri: string }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: size,
        width: size,
        borderRadius: size / 2,
      }}
    >
      <Avatar.Image
        size={size - theme.spacing.xxs * 2}
        style={{
          top: theme.spacing.xxs,
          left: theme.spacing.xxs,
        }}
        source={{
          uri,
        }}
      />
    </View>
  );
};
