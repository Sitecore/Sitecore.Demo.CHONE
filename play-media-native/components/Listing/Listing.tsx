import { useCallback, useEffect, useState } from 'react';
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
} from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

import { PAGE_SIZE } from '../../constants/pagination';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { Screen } from '../../features/Screen/Screen';
import { mockFetchData } from '../../helpers/mockPagination';
import { theme } from '../../theme/theme';

type ListingProps = {
  data: any;
  numColumns?: number;
  isLoading?: boolean;
  isRefreshing?: boolean;
  flatListKey?: number | string;
  renderItem: ListRenderItem<any>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Listing = ({
  data,
  numColumns,
  isLoading,
  isRefreshing = false,
  flatListKey,
  renderItem,
  onScroll,
  onRefresh,
  style,
}: ListingProps) => {
  const [items, setItems] = useState(data?.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    setItems(data?.slice(0, PAGE_SIZE));
  }, [data]);

  useEffect(() => {
    setIsListEnd(data && items && data?.length === items?.length);
  }, [data, items]);

  const fetchMoreData = useCallback(() => {
    !isListEnd && mockFetchData(data, items, setItems, setLoading);
  }, [data, items, isListEnd]);

  const ListFooter = (
    <View style={{ height: theme.spacing.xl }}>
      {loading && <ActivityIndicator animating={loading} />}
      {isListEnd && (
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.gray.DEFAULT,
          }}
        >
          No more items to show at the moment
        </Text>
      )}
    </View>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!!items && !items.length) {
    return (
      <Screen centered>
        <Text>No items to show</Text>
      </Screen>
    );
  }

  return (
    <SafeAreaView style={[{ backgroundColor: theme.colors.black.darkest }, style]}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator animating={isRefreshing} size="small" />
      </View>
      <FlatList
        key={flatListKey}
        data={items}
        numColumns={numColumns ? numColumns : 1}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        ListFooterComponent={ListFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.transparent]}
            tintColor={theme.colors.transparent}
          />
        }
        onScroll={onScroll}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};
