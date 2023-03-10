import { Image, Pressable } from 'react-native';

import { Media } from '../../interfaces/media';

export const MediaItemGridDisplay = ({
  item,
  onPress,
}: {
  item: Media;
  onPress?: (item: Media) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={{
        height: 120,
        flex: 0.5,
        margin: 2,
      }}
    >
      <Image
        source={{ uri: item.fileUrl }}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Pressable>
  );
};
