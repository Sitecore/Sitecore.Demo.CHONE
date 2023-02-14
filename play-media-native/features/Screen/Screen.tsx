import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { SafeAreaView } from 'react-native';

import { styles } from '../../theme/styles';

export const Screen = ({
  centered,
  children,
}: {
  centered?: boolean;
  children: PropsWithChildren<ReactNode | ReactNode[]>;
}) => {
  const finalStyles = useMemo(
    () =>
      centered
        ? {
            ...styles.screen,
            ...styles.centered,
          }
        : styles.screen,
    [centered]
  );

  return <SafeAreaView style={finalStyles}>{children}</SafeAreaView>;
};
