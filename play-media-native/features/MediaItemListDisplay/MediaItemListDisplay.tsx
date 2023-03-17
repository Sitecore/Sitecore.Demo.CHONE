import { ReactNode } from 'react';
import { Image, Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { DraggableHandle } from '../../components/DraggableHandle/DraggableHandle';
import { getFileType, removeFileExtension } from '../../helpers/media';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { Field } from '../Field/Field';

const MediaItemListDisplayWrapper = ({
  children,
  isDraggable,
  onPress,
  style,
}: {
  children: ReactNode[];
  isDraggable?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return isDraggable ? (
    <View style={style}>{children}</View>
  ) : (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  );
};

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
    <MediaItemListDisplayWrapper
      isDraggable={isDraggable}
      onPress={() => onPress(item)}
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
          <Field title="File type" value={getFileType(item)} />
          <Field title="Size" value={`${item.fileWidth} x ${item.fileHeight}`} />
          {item.status && <Field title="Status" value={item.status} />}
        </View>
      </View>
    </MediaItemListDisplayWrapper>
  );
};
