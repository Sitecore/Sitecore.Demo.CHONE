import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export const Listing = ({ data, isLoading, renderItem }) => {
  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#000",
        }}
      >
        <Text>Loading ....</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <FlatList
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
