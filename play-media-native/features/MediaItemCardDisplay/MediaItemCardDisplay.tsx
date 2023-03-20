import { Card } from 'react-native-paper';

import { getFileType, removeFileExtension } from '../../helpers/media';
import { Media } from '../../interfaces/media';
import { theme } from '../../theme/theme';
import { Field } from '../Field/Field';

export const MediaItemCardDisplay = ({
  item,
  onPress,
}: {
  item: Media;
  onPress?: (item: Media) => void;
}) => {
  return (
    <Card
      key={item.fileUrl}
      style={{
        borderRadius: 0,
        marginBottom: theme.spacing.sm,
      }}
      onPress={onPress ? () => onPress(item) : null}
    >
      <Card.Cover theme={{ roundness: 0 }} source={{ uri: item.fileUrl }} />
      <Card.Content
        style={{
          backgroundColor: theme.colors.black.light,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          paddingHorizontal: theme.spacing.xs,
        }}
      >
        {item.name && <Field title="Name" value={removeFileExtension(item.name)} />}
        <Field title="File type" value={getFileType(item)} />
        <Field title="State" value={item.status} />
        <Field title="Size" value={`${item.fileWidth} x ${item.fileHeight}`} />
      </Card.Content>
    </Card>
  );
};
