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
          marginBottom: theme.spacing.xs,
          backgroundColor: theme.colors.black.lightest,
        }}
      >
        <Image
          style={{
            height: 110,
            width: 'auto',
            flex: 1,
          }}
          source={{ uri: item.fileUrl }}
        />
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            marginLeft: theme.spacing.xs,
          }}
        >
          <Field title="Name" value={removeFileExtension(item.name)} />
          <Field title="File type" value={getFileType(item)} />
          <Field title="Size" value={`${item.fileWidth} x ${item.fileHeight}`} />
          <Field title="Status" value={item.status} />
        </View>
      </View>
    </Pressable>
  );
};
