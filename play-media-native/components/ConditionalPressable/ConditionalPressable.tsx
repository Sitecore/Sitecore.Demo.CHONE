import { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

export const ConditionalPressable = ({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress?: () => void | null;
  style?: StyleProp<ViewStyle>;
}) => {
  return onPress ? (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  ) : (
    <View style={style}>{children}</View>
  );
};
