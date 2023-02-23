import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Text } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { MEDIA_SOURCES } from '../../constants/media';
import { useAthleteFields } from '../../hooks/useAthleteFields/useAthleteFields';
import { useEventFields } from '../../hooks/useEventFields/useEventFields';
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
  contentType,
  fieldKey,
  fieldTitle,
  initialRoute,
  items,
  style,
}: {
  contentType: string;
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  items: Media[] | Media;
  style?: StyleProp<any>;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { edit: editAthleteFields, remove: removeAthleteFields } = useAthleteFields();
  const { edit: editEventFields, remove: removeEventFields } = useEventFields();

  const single = !Array.isArray(items);
  const empty = Array.isArray(items) ? items?.length === 0 : !items;
  const headerText = `${fieldTitle} ${single ? ' (single)' : ''}`;

  const editMedia = useCallback(
    (image: Media) => {
      navigation.navigate('EditMedia', {
        contentType,
        isEditMode: true,
        initialRoute,
        image,
        key: fieldKey,
        single,
      });
    },
    [contentType, fieldKey, initialRoute, navigation, single]
  );

  const deleteMedia = useCallback(
    ({ key, value }: { key: string; value: Media }) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        removeEventFields({ key, value });
      } else {
        removeAthleteFields({ key, value });
      }
    },
    [contentType, removeAthleteFields, removeEventFields]
  );

  const reorderItems = useCallback(
    (items: Media) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({ key: fieldKey, value: items });
      } else {
        editAthleteFields({ key: fieldKey, value: items });
      }
    },
    [contentType, editAthleteFields, editEventFields, fieldKey]
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

  const content = useMemo(
    () =>
      Array.isArray(items) ? (
        <DraggableList
          items={items}
          onDragEnd={reorderItems}
          renderItem={(item: Media) => (
            <ListItem item={item} menuItems={resolveActionsForItem(item)} />
          )}
        />
      ) : (
        items && <ListItem item={items} menuItems={resolveActionsForItem(items)} />
      ),
    [items, reorderItems, resolveActionsForItem]
  );

  return (
    <View style={style}>
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
          contentType={contentType}
          empty={empty}
          fieldKey={fieldKey}
          initialRoute={initialRoute}
          single={single}
        />
      </View>
      {content}
    </View>
  );
};
