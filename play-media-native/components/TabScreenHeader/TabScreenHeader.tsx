import { View } from "react-native";
import { SecondaryMenu } from "../SecondaryMenu/SecondaryMenu";
import { Logo } from "../Logo/Logo";

export const TabScreenHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Logo />
      <SecondaryMenu />
    </View>
  );
};
