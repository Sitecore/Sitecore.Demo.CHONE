import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleProp } from 'react-native';

import { theme } from '../../theme/theme';

interface Props {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<any>;
}

export const Icon = ({ name, size, color, style }: Props) => {
  return (
    <Ionicons
      name={name}
      size={size || 32}
      color={color || theme.colors.black.DEFAULT}
      style={style}
    />
  );
};
