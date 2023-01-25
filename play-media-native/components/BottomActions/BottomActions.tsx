import { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";
import { theme } from "../../theme/theme";

interface Props {
  children: PropsWithChildren<ReactNode | ReactNode[]>;
}

export const BottomActions = ({ children }: Props) => {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        bottom: 0,
        zIndex: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: theme.colors.black.darkest,
      }}
    >
      {children}
    </View>
  );
};
