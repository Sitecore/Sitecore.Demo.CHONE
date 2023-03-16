import { Image, Pressable } from 'react-native';

import { Media } from '../../interfaces/media';
import { theme } from '../../theme/theme';

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
        flex: 1,
        aspectRatio: 1,
        marginHorizontal: theme.spacing.xxs,
        marginBottom: theme.spacing.xs,
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
