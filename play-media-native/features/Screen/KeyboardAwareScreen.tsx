import { ReactNode } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

export const KeyboardAwareScreen = ({
  centered,
  children,
}: {
  centered?: boolean;
  children: ReactNode;
}) => {
  const centeredStyle = centered ? styles.centered : {};

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      extraHeight={Platform.OS === 'ios' ? theme.spacing.xxl : 0}
      extraScrollHeight={Platform.OS === 'ios' ? theme.spacing.xxl : 0}
      style={{
        backgroundColor: theme.colors.black.darkest,
      }}
      contentContainerStyle={{
        ...styles.screen,
        ...centeredStyle,
        flexGrow: 1,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
