import { Image } from "react-native";

export const Logo = () => {
  return (
    <Image
      style={{
        height: 40,
        width: 250,
      }}
      source={require("../../assets/play-media-logo.png")}
    />
  );
};
