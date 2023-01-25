import { SafeAreaView } from "react-native";
import { styles } from "../../theme/styles";
import { PropsWithChildren, ReactNode, useMemo } from "react";

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
