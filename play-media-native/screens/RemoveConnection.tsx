import { SafeAreaView, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import { useCallback } from "react";
import { MultiSelectChips } from "../components/MultiSelectChips/MultiSelectChips";

export const RemoveConnectionScreen = ({ navigation }) => {
  const onRemoveSuccess = useCallback(
    () =>
      setTimeout(() => {
        navigation.navigate("SelectConnection");
      }, 1000),
    [navigation]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Logo style={{ marginBottom: 40 }} /> */}
        <Text
          style={{
            color: "white",
            maxWidth: "80%",
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          Select connection(s) to be removed.
        </Text>
        <MultiSelectChips />
      </View>
    </SafeAreaView>
  );
};
