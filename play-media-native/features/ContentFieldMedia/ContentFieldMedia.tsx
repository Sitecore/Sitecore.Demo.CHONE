import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { FieldLabel } from '../../components/FieldLabel/FieldLabel';
import { MEDIA_SOURCES } from '../../constants/media';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Media } from '../../interfaces/media';
import { StackNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';
import { ActionMenu, MenuItem } from '../ActionMenu/ActionMenu';
import { MediaItemListDisplay } from '../MediaItemListDisplay/MediaItemListDisplay';
import { MenuAddMedia } from '../MenuAddMedia/MenuAddMedia';

const menuStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
};

export const ListItem = ({
  item,
  menuItems,
  isDraggable,
}: {
  item: Media;
  menuItems: MenuItem[];
  isDraggable?: boolean;
}) => {
  return (
    <View style={{ position: 'relative' }}>
      <MediaItemListDisplay item={item} isDraggable={isDraggable} />
      <ActionMenu
        iconColor={theme.colors.black.DEFAULT}
        iconSize={theme.sizing.menuIconSize}
        menuItems={menuItems}
        style={menuStyle}
      />
    </View>
  );
};

export const ContentFieldMedia = ({
  fieldKey,
  fieldTitle,
  initialRoute,
  items,
  required,
  single,
  stateKey,
  style,
  headerTitle,
}: {
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  items: Media[] | Media;
  required: boolean;
  single: boolean;
  stateKey: string;
  style?: StyleProp<any>;
  headerTitle?: string;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { edit, remove } = useContentItems();

  const empty = Array.isArray(items) ? items?.length === 0 : !items;

  const editMedia = useCallback(
    (image: Media) => {
      navigation.navigate('EditMedia', {
        title: headerTitle,
        isEditMode: true,
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    },
    [fieldKey, initialRoute, navigation, single, stateKey, headerTitle]
  );

  const deleteMedia = useCallback(
    ({ key, value }: { key: string; value: Media }) => {
      remove({ id: stateKey, key, value });
    },
    [remove, stateKey]
  );

  const reorderItems = useCallback(
    (items: Media) => {
      edit({ id: stateKey, key: fieldKey, value: items });
    },
    [edit, fieldKey, stateKey]
  );

  const resolveActionsForItem = useCallback(
    (item: Media) => {
      return item?.source === MEDIA_SOURCES.LIBRARY || item?.source === MEDIA_SOURCES.CAMERA
        ? [
            {
              icon: 'circle-edit-outline',
              handler: () => {
                editMedia(item);
              },
              title: 'Edit',
            },
            {
              icon: 'close',
              handler: () => {
                deleteMedia({ key: fieldKey, value: item });
              },
              title: 'Delete',
            },
          ]
        : [
            {
              icon: 'close',
              handler: () => {
                deleteMedia({ key: fieldKey, value: item });
              },
              title: 'Delete',
            },
          ];
    },
    [editMedia, fieldKey, deleteMedia]
  );

  const content = useMemo(() => {
    if (Array.isArray(items)) {
      return (
        <DraggableList
          items={items}
          onDragEnd={reorderItems}
          renderItem={(item: Media) => (
            <ListItem item={item} menuItems={resolveActionsForItem(item)} isDraggable />
          )}
        />
      );
    }

    return items ? <ListItem item={items} menuItems={resolveActionsForItem(items)} /> : null;
  }, [items, reorderItems, resolveActionsForItem]);

  return (
    <View style={style}>
      <Divider
        style={{ backgroundColor: theme.colors.gray.light, marginBottom: theme.spacing.xs }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xs,
        }}
      >
        <FieldLabel required={required} single={single} title={fieldTitle} />
        <MenuAddMedia
          empty={empty}
          fieldKey={fieldKey}
          initialRoute={initialRoute}
          single={single}
          stateKey={stateKey}
          headerTitle={headerTitle}
        />
      </View>
      {content}
    </View>
  );
};
