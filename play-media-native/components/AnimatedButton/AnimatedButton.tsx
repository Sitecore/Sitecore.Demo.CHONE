import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

import { theme } from '../../theme/theme';
import { MaterialIcon } from '../Icon/MaterialIcon';

export const AnimatedButton = ({
  extended,
  iconName,
  label,
  onPress,
  style,
}: {
  extended: boolean;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.yellow.DEFAULT,
          padding: theme.spacing.xs,
          overflow: 'hidden',
          borderRadius: theme.spacing.xs,
        },
        style,
      ]}
    >
      <>
        <MaterialIcon name={iconName} size={theme.sizing.animatedFabIconSize} />
        {extended && (
          <Text
            variant="labelLarge"
            style={{
              color: theme.colors.black.DEFAULT,
              paddingLeft: theme.spacing.xxs,
              paddingRight: theme.spacing.xs,
            }}
          >
            {label}
          </Text>
        )}
      </>
    </TouchableRipple>
  );
};
