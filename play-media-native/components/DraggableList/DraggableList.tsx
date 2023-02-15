import { useCallback, useMemo } from 'react';
import { Pressable, StyleProp } from 'react-native';
import { NestableDraggableFlatList, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const DraggableList = ({
  items,
  onDragEnd,
  renderItem,
  style,
}: {
  items: any;
  onDragEnd: (items: any) => void;
  renderItem: any;
  style?: StyleProp<any>;
}) => {
  const renderer = useCallback(
    ({ item, drag, isActive }: any) => (
      <Pressable onLongPress={drag} disabled={isActive} delayLongPress={300}>
        <ScaleDecorator>{renderItem(item, drag)}</ScaleDecorator>
      </Pressable>
    ),
    [renderItem]
  );
  const handleDrag = useCallback(({ data }) => {
    onDragEnd(data);
  }, [onDragEnd])

  const displayedItems = useMemo(() => items.map((item: any) => ({ ...item, key: item.id })), [items])

  if (!items?.length) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <NestableDraggableFlatList
        data={displayedItems}
        onDragEnd={handleDrag}
        keyExtractor={(item: any) => item.key}
        renderItem={renderer}
        style={style}
      />
    </GestureHandlerRootView>
  );
};
