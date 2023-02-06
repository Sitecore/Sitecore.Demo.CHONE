import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleProp } from "react-native";
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const DraggableList = ({
  items,
  renderItem,
  style,
}: {
  items: any;
  renderItem: any;
  style?: StyleProp<any>;
}) => {
  const [data, setData] = useState(
    items.map((item: any) => ({ ...item, key: item.id }))
  );
  const renderer = useCallback(
    ({ item, drag, isActive }: any) => (
      <Pressable onLongPress={drag} disabled={isActive} delayLongPress={300}>
        <ScaleDecorator>{renderItem(item, drag)}</ScaleDecorator>
      </Pressable>
    ),
    []
  );

  // update data on props change
  //
  useEffect(() => {
    setData(items.map((item: any) => ({ ...item, key: item.id })));
  }, [items]);

  if (!data?.length) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <NestableDraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item: any) => item.key}
        renderItem={renderer}
        style={style}
      />
    </GestureHandlerRootView>
  );
};
