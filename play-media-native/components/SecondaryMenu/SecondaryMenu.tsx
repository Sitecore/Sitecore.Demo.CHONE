import { useCallback, useState } from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

export const SecondaryMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(true);

  const closeMenu = useCallback(() => {
    setVisible(false);
  }, []);

  const openMenu = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            setVisible(false);
            navigation.navigate("SelectConnection");
          }}
          title="Connections"
        />
      </Menu>
    </View>
  );
};
