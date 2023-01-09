import { Image, StyleProp } from "react-native";

interface Props {
  style?: StyleProp<any>;
}

export const Logo = ({ style }: Props) => {
  return (
    <Image
      style={{
        height: 40,
        width: 250,
        ...style,
      }}
      source={require("../../assets/play-media-logo.png")}
    />
  );
};
