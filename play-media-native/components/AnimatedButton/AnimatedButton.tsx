import { TouchableRipple, Text } from 'react-native-paper';

import { theme } from '../../theme/theme';
import { Icon } from '../Icon/Icon';

export const AnimatedButton = ({ iconName, label, onPress, style, extended }) => {
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
        },
        style,
      ]}
    >
      <>
        <Icon name={iconName} size={theme.sizing.animatedFabIconSize} />
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
