import { useCallback, useMemo, useState } from "react";
import { StyleProp, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

export interface MenuItem {
  icon: string;
  handler: () => void;
  title: string;
}

interface Props {
  iconColor?: string;
  iconSize?: number;
  menuItems: MenuItem[];
  style?: StyleProp<any>;
}

export const ActionMenu = ({
  iconColor,
  iconSize,
  menuItems,
  style,
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const items = useMemo(() => {
    return menuItems.map((item) => (
      <Menu.Item
        key={item.title}
        leadingIcon={item.icon}
        onPress={() => {
          setVisible(false);
          item.handler();
        }}
        title={item.title}
      />
    ));
  }, [menuItems]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <View style={style}>
      <Menu
        anchor={
          <IconButton
            containerColor={iconColor}
            icon="dots-vertical"
            onPress={onOpen}
            size={iconSize || 20}
          />
        }
        onDismiss={onClose}
        visible={visible}
      >
        {items}
      </Menu>
    </View>
  );
};
