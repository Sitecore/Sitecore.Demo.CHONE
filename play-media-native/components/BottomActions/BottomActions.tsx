import { PropsWithChildren, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { theme } from '../../theme/theme';

interface Props {
  children: PropsWithChildren<ReactNode | ReactNode[]>;
  style?: StyleProp<ViewStyle>;
}

export const BottomActions = ({ children, style }: Props) => {
  return (
    <View
      style={[
        {
          width: '100%',
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          bottom: 0,
          zIndex: 10,
          padding: theme.spacing.xs,
          backgroundColor: theme.colors.black.darkest,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
