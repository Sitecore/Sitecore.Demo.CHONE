import { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { theme } from '../../theme/theme';

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
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.colors.black.DEFAULT,
      }),
    },
  });

  const isSelected = selected ? 'checked' : 'unchecked';

  return (
    <View style={style}>
      <View style={pageStyles.checkboxView}>
        <Checkbox
          color={theme.colors.white.DEFAULT}
          onPress={onSelect}
          status={isSelected}
          uncheckedColor={theme.colors.white.DEFAULT}
        />
      </View>
      {children}
    </View>
  );
};
