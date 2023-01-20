import { FC, ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode[];
}

export const RichTextContainer: FC<Props> = ({ children }) => (
  <View>{children}</View>
);
