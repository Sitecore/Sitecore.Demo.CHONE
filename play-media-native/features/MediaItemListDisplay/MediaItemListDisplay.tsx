import { Image, View } from 'react-native';

import { ConditionalPressable } from '../../components/ConditionalPressable/ConditionalPressable';
import { DraggableHandle } from '../../components/DraggableHandle/DraggableHandle';
import { getFileType, removeFileExtension } from '../../helpers/media';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { Field } from '../Field/Field';

export const MediaItemListDisplay = ({
  item,
  onPress,
  isDraggable,
}: {
  item: Media;
  onPress?: (item: Media) => void;
  isDraggable?: boolean;
}) => {
  return (
    <ConditionalPressable
      onPress={onPress ? () => onPress(item) : null}
      style={{
        marginBottom: theme.spacing.sm,
        backgroundColor: theme.colors.black.light,
      }}
    >
      {isDraggable && <DraggableHandle />}
      <View
        key={item.fileUrl}
        style={[
          {
            flexDirection: 'row',
          },
          isDraggable && styles.draggableContent,
        ]}
      >
        <Image
          style={{
            width: 'auto',
            aspectRatio: 1,
            flex: 1,
          }}
          source={{ uri: item.fileUrl }}
        />
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            paddingLeft: theme.spacing.sm,
          }}
        >
          {item.name && <Field title="Name" value={removeFileExtension(item.name)} />}
          <Field title="Type" value={getFileType(item)} />
          {item.status && <Field title="State" value={item.status} />}
          <Field title="Size" value={`${item.fileWidth} x ${item.fileHeight}`} />
        </View>
      </View>
    </ConditionalPressable>
  );
};
