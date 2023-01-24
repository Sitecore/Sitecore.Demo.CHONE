import { FC, ReactNode } from "react";
import { Text } from "react-native-paper";

interface Props {
  children: ReactNode[];
}

export const ListItem: FC<Props> = ({ children }) => <Text>{children}</Text>;
