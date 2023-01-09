import { Image } from "react-native";

export const Logo = ({ style }) => {
  return (
    <Image
      style={{
        height: 66,
        width: "100%",
        resizeMode: "contain",
        ...style,
      }}
      source={require("../../assets/play-media-logo.png")}
    />
  );
};
