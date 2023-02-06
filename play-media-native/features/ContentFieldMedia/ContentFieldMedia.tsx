import { useMemo } from "react";
import { StyleProp, View } from "react-native";
import { Text } from "react-native-paper";
import { Media } from "../../interfaces/media";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { MediaItemListDisplay } from "../MediaItemListDisplay/MediaItemListDisplay";
import { theme } from "../../theme/theme";
import { MenuAddMedia } from "../MenuAddMedia/MenuAddMedia";

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
  const content = useMemo(
    () =>
      Array.isArray(items) ? (
        <DraggableList
          items={items}
          renderItem={(item: Media) => <MediaItemListDisplay item={item} />}
        />
      ) : (
        items && <MediaItemListDisplay item={items} />
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
