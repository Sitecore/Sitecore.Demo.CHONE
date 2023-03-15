import { useCallback, useMemo, useState } from 'react';
import { StyleProp, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

import { theme } from '../../theme/theme';

export interface MenuItem {
  icon: string;
  handler: (item?: any) => void;
  title: string;
}

interface Props {
  iconColor?: string;
  iconSize?: number;
  menuItems: MenuItem[];
  style?: StyleProp<any>;
}

export const ActionMenu = ({ iconSize, menuItems, style }: Props) => {
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

  if (menuItems?.length === 1) {
    return (
      <View style={style}>
        <IconButton
          icon={menuItems[0].icon}
          onPress={menuItems[0].handler}
          size={iconSize || 20}
          iconColor={theme.colors.gray.DEFAULT}
        />
      </View>
    );
  }

  return (
    <View style={style}>
      <Menu
        anchor={<IconButton icon="dots-vertical" onPress={onOpen} size={iconSize || 20} />}
        onDismiss={onClose}
        visible={visible}
      >
        {items}
      </Menu>
    </View>
  );
};
