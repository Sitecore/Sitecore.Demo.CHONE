import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleProp } from 'react-native';

import { theme } from '../../theme/theme';

interface Props {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<any>;
}

export const MaterialIcon = ({ name, size, color, style }: Props) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size || 32}
      color={color || theme.colors.black.DEFAULT}
      style={style}
    />
  );
};
