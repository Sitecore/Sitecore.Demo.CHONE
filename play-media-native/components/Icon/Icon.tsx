import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleProp } from 'react-native';

interface Props {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<any>;
}

export const Icon = ({ name, size, color, style }: Props) => {
  return <Ionicons name={name} size={size || 32} color={color || 'black'} style={style} />;
};
