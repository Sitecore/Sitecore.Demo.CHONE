import { Image } from "react-native";

export const Logo = ({ style }) => {
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
