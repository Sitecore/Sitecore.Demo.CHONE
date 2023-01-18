import { useCallback, useMemo, useState } from "react";
import { StyleProp, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { theme } from "../../theme/theme";

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
        leadingIcon={item.icon}
        onPress={item.handler}
        title={item.title}
      />
    ));
  }, []);

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
