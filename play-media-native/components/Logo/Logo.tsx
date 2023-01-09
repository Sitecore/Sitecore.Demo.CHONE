import { Image } from "react-native";

export const Logo = () => {
  return (
    <Image
      style={{
        height: 66,
        width: "100%",
        resizeMode: "contain",
      }}
      source={require("../../assets/play-media-logo.png")}
    />
  );
};
