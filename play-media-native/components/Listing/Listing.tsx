import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { MOCK_FETCH_TIMEOUT, PAGE_SIZE } from "../../constants/pagination";
import { LoadingScreen } from "../../features/LoadingScreen/LoadingScreen";
import { mockFetchData } from "../../helpers/mockPagination";
import { theme } from "../../theme/theme";

type ListingProps = {
  data: any;
  isLoading?: boolean;
  renderItem: ListRenderItem<any>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  style?: StyleProp<ViewStyle>;
};

export const Listing = ({
  data,
  isLoading,
  renderItem,
  onScroll,
  style,
}: ListingProps) => {
  const [items, setItems] = useState(data?.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setItems(data?.slice(0, PAGE_SIZE));
  }, [data]);

  useEffect(() => {
    setIsListEnd(data && items && data?.length === items?.length);
  }, [items]);

  const fetchMoreData = useCallback(() => {
    !isListEnd && mockFetchData(data, items, setItems, setLoading);
  }, [data, items, isListEnd]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(data?.slice(0, PAGE_SIZE));
      setIsListEnd(false);
      setRefreshing(false);
    }, MOCK_FETCH_TIMEOUT);
  }, [data]);

  const ListFooter = (
    <>
      {loading && <ActivityIndicator animating={loading} />}
      {isListEnd && (
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.gray.DEFAULT,
          }}
        >
          No more items to show at the moment
        </Text>
      )}
    </>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={[{ backgroundColor: theme.colors.black.darkest }, style]}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating={refreshing} size="small" />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        ListFooterComponent={ListFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.transparent]}
            tintColor={theme.colors.transparent}
          />
        }
        onScroll={onScroll}
      />
    </SafeAreaView>
  );
};
