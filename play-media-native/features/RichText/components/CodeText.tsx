import { FC, ReactNode } from "react";
import { Text } from "react-native-paper";
import { theme } from "../../../theme/theme";

interface Props {
  children: ReactNode[];
}

export const CodeText: FC<Props> = ({ children }) => (
  <Text
    style={{
      fontFamily: theme.fontFamily.mono,
    }}
  >
    {children}
  </Text>
);
