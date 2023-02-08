import { FC, ReactNode } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../../theme/theme";

interface Props {
  children: ReactNode[];
}

export const BulletList: FC<Props> = ({ children }) => (
  <View
    style={{
      paddingLeft: theme.spacing.xs,
      marginVertical: theme.spacing.xxs,
    }}
  >
    {children.map((child, i) => (
      <Text key={i}>
        {`\u2022`}
        {"  "}
        {child}
      </Text>
    ))}
  </View>
);
