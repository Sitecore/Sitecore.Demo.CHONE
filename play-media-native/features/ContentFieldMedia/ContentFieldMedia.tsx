import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { MEDIA_SOURCES } from '../../constants/media';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Media } from '../../interfaces/media';
import { StackNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';
import { ActionMenu, MenuItem } from '../ActionMenu/ActionMenu';
import { MediaItemListDisplay } from '../MediaItemListDisplay/MediaItemListDisplay';
import { MediaSourceIcon } from '../MediaSourceIcon/MediaSourceIcon';
import { MenuAddMedia } from '../MenuAddMedia/MenuAddMedia';

const menuStyle = {
  position: 'absolute',
  bottom: 0,
  right: -5,
};

const mediaSourceIconStyle = {
  position: 'absolute',
  color: theme.colors.white.DEFAULT,
};

export const ListItem = ({ item, menuItems }: { item: Media; menuItems: MenuItem[] }) => {
  return (
    <View style={{ position: 'relative' }}>
      <MediaItemListDisplay item={item} />
      <MediaSourceIcon
        size={15}
        source={item.source}
        style={{
          ...mediaSourceIconStyle,
          top: 0,
          right: 5,
          borderRadius: 50,
          padding: 8,
        }}
      />
      <ActionMenu
        iconColor={theme.colors.black.DEFAULT}
        iconSize={25}
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
  stateKey,
  style,
}: {
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  items: Media[] | Media;
  stateKey: string;
  style?: StyleProp<any>;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { edit, remove } = useContentItems();

  const single = !Array.isArray(items);
  const empty = Array.isArray(items) ? items?.length === 0 : !items;
  const headerText = `${fieldTitle} ${single ? ' (single)' : ''}`;

  const editMedia = useCallback(
    (image: Media) => {
      navigation.navigate('EditMedia', {
        isEditMode: true,
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    },
    [fieldKey, initialRoute, navigation, single, stateKey]
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
      return item.source !== MEDIA_SOURCES.CH_ONE
        ? [
            {
              icon: 'circle-edit-outline',
              handler: () => {
                editMedia(item);
              },
              title: 'Edit',
            },
            {
              icon: 'delete-outline',
              handler: () => {
                deleteMedia({ key: fieldKey, value: item });
              },
              title: 'Delete',
            },
          ]
        : [
            {
              icon: 'delete-outline',
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
            <ListItem item={item} menuItems={resolveActionsForItem(item)} />
          )}
        />
      );
    }

    return items ? <ListItem item={items} menuItems={resolveActionsForItem(items)} /> : null;
  }, [items, reorderItems, resolveActionsForItem]);

  return (
    <View style={style}>
      <Divider
        style={{ backgroundColor: theme.colors.gray.light, marginBottom: theme.spacing.lg }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xs,
        }}
      >
        <Text variant="labelSmall" style={{ marginBottom: theme.spacing.xs }}>
          {headerText}
        </Text>
        <MenuAddMedia
          empty={empty}
          fieldKey={fieldKey}
          initialRoute={initialRoute}
          single={single}
          stateKey={stateKey}
        />
      </View>
      {content}
    </View>
  );
};
