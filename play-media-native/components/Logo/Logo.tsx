import { Image, ImageStyle } from "react-native";

export const Logo = ({ style }: { style?: ImageStyle }) => {
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
