import { Image } from 'react-native';

import { ConditionalPressable } from '../../components/ConditionalPressable/ConditionalPressable';
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
    <ConditionalPressable
      onPress={onPress ? () => onPress(item) : null}
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
    </ConditionalPressable>
  );
};
