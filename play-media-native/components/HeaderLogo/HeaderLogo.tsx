import { Image } from "react-native";

export const HeaderLogo = () => {
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
