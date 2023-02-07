import { useCallback, useMemo } from "react";
import { StyleProp, View } from "react-native";
import { Text } from "react-native-paper";
import { Media } from "../../interfaces/media";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { MediaItemListDisplay } from "../MediaItemListDisplay/MediaItemListDisplay";
import { theme } from "../../theme/theme";
import { MenuAddMedia } from "../MenuAddMedia/MenuAddMedia";
import { ActionMenu, MenuItem } from "../ActionMenu/ActionMenu";
import { MEDIA_SOURCES } from "../../constants/media";
import { MediaSourceIcon } from "../MediaSourceIcon/MediaSourceIcon";

const menuStyle = {
  position: "absolute",
  bottom: 0,
  right: -5,
};

const mediaSourceIconStyle = {
  position: "absolute",
  color: theme.colors.white.DEFAULT,
};

export const ListItem = ({
  item,
  menuItems,
}: {
  item: Media;
  menuItems: MenuItem[];
}) => {
  return (
    <View style={{ position: "relative" }}>
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
  style,
}: {
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  items: Media[] | Media;
  style?: StyleProp<any>;
}) => {
  const resolveActionsForItem = useCallback((item: Media) => {
    return item.source !== MEDIA_SOURCES.CH_ONE
      ? [
          {
            icon: "circle-edit-outline",
            handler: () => {},
            title: "Edit",
          },
          {
            icon: "delete-outline",
            handler: () => {},
            title: "Delete",
          },
        ]
      : [
          {
            icon: "delete-outline",
            handler: () => {},
            title: "Delete",
          },
        ];
  }, []);

  const content = useMemo(
    () =>
      Array.isArray(items) ? (
        <DraggableList
          items={items}
          renderItem={(item: Media) => (
            <ListItem item={item} menuItems={resolveActionsForItem(item)} />
          )}
        />
      ) : (
        items && (
          <ListItem item={items} menuItems={resolveActionsForItem(items)} />
        )
      ),
    [items]
  );
  const single = !Array.isArray(items);
  const empty = Array.isArray(items) ? items?.length === 0 : !items;
  const headerText = `${fieldTitle} ${single ? " (single)" : ""}`;

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
        />
      </View>
      {content}
    </View>
  );
};
