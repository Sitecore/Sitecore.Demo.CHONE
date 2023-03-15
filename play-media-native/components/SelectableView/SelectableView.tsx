import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, View } from 'react-native';

import { theme } from '../../theme/theme';
import { MaterialIcon } from '../Icon/MaterialIcon';

interface Props {
  children: PropsWithChildren<ReactNode | ReactNode[]>;
  onSelect: () => void;
  right?: number;
  selected: boolean;
  style?: StyleProp<any>;
  top?: number;
}

export const SelectableView = ({ children, onSelect, right, selected, style, top }: Props) => {
  const pageStyles = StyleSheet.create({
    checkbox: {
      position: 'absolute',
      top: top || theme.spacing.xs,
      right: right || theme.spacing.xs,
      width: theme.spacing.sm,
      height: theme.spacing.sm,
      backgroundColor: theme.colors.white.DEFAULT,
      borderWidth: 1,
      borderColor: theme.colors.gray.DEFAULT,
      zIndex: 100,
    },
  });

  const checkmark = useMemo(
    () => (selected ? <MaterialIcon name="check-bold" size={theme.spacing.sm} /> : <></>),
    [selected]
  );

  return (
    <Pressable onPress={onSelect} style={style}>
      <View style={pageStyles.checkbox}>{checkmark}</View>
      {children}
    </Pressable>
  );
};
