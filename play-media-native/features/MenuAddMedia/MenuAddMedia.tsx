import { useCallback, useMemo, useState } from "react";
import { Button, Menu } from "react-native-paper";
import { useCamera } from "../../hooks/useCamera/useCamera";
import { useDeviceLibrary } from "../../hooks/useDeviceLibrary/useDeviceLibrary";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { DeviceMedia } from "../../interfaces/media";

export const MenuAddMedia = ({
  empty,
  fieldKey,
  initialRoute,
  single = false,
}: {
  empty: boolean;
  fieldKey: string;
  initialRoute: string;
  single: boolean;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const [visible, setVisible] = useState(false);
  const { launch: launchCamera } = useCamera();
  const { launch: launchLibrary } = useDeviceLibrary();

  const close = useCallback(() => setVisible(false), []);
  const open = useCallback(() => setVisible(true), []);

  const handleCameraPress = useCallback(() => {
    launchCamera((image: DeviceMedia) => {
      navigation.navigate("EditMedia", {
        initialRoute,
        image,
        key: fieldKey,
        single,
      });
    });

    close();
  }, [close, fieldKey, launchCamera, navigation, single]);

  const handleMediaLibraryPress = useCallback(() => {
    launchLibrary((image: DeviceMedia) => {
      navigation.navigate("EditMedia", {
        initialRoute,
        image,
        key: fieldKey,
        single,
      });
    });

    close();
  }, [close, fieldKey, launchLibrary, navigation, single]);

  const handleCHonePress = useCallback(() => {
    navigation.navigate("AddCH1Media", { key: fieldKey, initialRoute, single });

    close();
  }, [close, fieldKey, navigation, single]);

  const buttonLabel = useMemo(() => {
    const add = "Add";
    const replace = "Replace";

    if (empty) {
      return add;
    }

    return single ? replace : add;
  }, [empty, single]);

  return (
    <Menu
      visible={visible}
      onDismiss={close}
      anchor={
        <Button icon="plus" mode="contained" onPress={open}>
          {buttonLabel}
        </Button>
      }
    >
      <Menu.Item
        leadingIcon="camera"
        onPress={handleCameraPress}
        title="Camera"
      />
      <Menu.Item
        leadingIcon="folder"
        onPress={handleMediaLibraryPress}
        title="Device"
      />
      <Menu.Item onPress={handleCHonePress} title="CH ONE" />
    </Menu>
  );
};
