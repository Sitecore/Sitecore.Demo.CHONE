import { View } from 'react-native';

import { theme } from '../../theme/theme';
import { MaterialIcon } from '../Icon/MaterialIcon';

export const DraggableHandle = () => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.sizing.draggableHandleWidth,
      }}
    >
      <MaterialIcon
        name="menu"
        color={theme.colors.white.DEFAULT}
        size={theme.sizing.menuIconSize}
      />
    </View>
  );
};
