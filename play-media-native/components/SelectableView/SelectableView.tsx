import { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, TouchableHighlight, View } from 'react-native';

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
    checkboxView: {
      position: 'absolute',
      top: top || 10,
      right: right || 5,
      zIndex: 100,
      ...(Platform.OS === 'ios' && {
        backgroundColor: theme.colors.yellow.DEFAULT,
        borderWidth: 1,
        borderColor: theme.colors.black.DEFAULT,
      }),
    },
  });

  const checkmark = selected ? <MaterialIcon name="check-bold" size={theme.spacing.sm} /> : <></>;

  return (
    <View style={style}>
      <View style={pageStyles.checkboxView}>
        <TouchableHighlight
          activeOpacity={0.6}
          onPress={onSelect}
          style={{
            width: theme.spacing.sm,
            height: theme.spacing.sm,
            backgroundColor: theme.colors.white.DEFAULT,
          }}
        >
          {checkmark}
        </TouchableHighlight>
      </View>
      {children}
    </View>
  );
};
