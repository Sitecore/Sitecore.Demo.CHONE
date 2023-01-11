import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../theme/theme";

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
    <SafeAreaView style={{ backgroundColor: theme.colors.black.darkest }}>
      <FlatList
        style={{ paddingHorizontal: theme.spacing.sm }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
