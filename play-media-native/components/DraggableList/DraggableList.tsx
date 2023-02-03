import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleProp } from "react-native";
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Text } from "react-native-paper";
import { theme } from "../../theme/theme";

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
    <>
      <Text
        style={{ marginVertical: theme.spacing.sm, textAlign: "center" }}
        variant="titleSmall"
      >
        Keep an item pressed to drag and drop
      </Text>
      <NestableDraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item: any) => item.key}
        renderItem={renderer}
        style={style}
      />
    </>
  );
};
