import { Image, Pressable, View } from 'react-native';

import { getFileType, removeFileExtension } from '../../helpers/media';
import { Media } from '../../interfaces/media';
import { theme } from '../../theme/theme';
import { Field } from '../Field/Field';

export const MediaItemListDisplay = ({
  item,
  onPress,
}: {
  item: Media;
  onPress?: (item: Media) => void;
}) => {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View
        key={item.fileUrl}
        style={{
          width: '100%',
          flexDirection: 'row',
          marginBottom: theme.spacing.sm,
          backgroundColor: theme.colors.black.light,
        }}
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
          <Field title="File type" value={getFileType(item)} />
          <Field title="Size" value={`${item.fileWidth} x ${item.fileHeight}`} />
          <Field title="Status" value={item.status} />
        </View>
      </View>
    </Pressable>
  );
};
