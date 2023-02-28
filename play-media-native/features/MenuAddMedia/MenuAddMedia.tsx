import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { Button, Menu } from 'react-native-paper';

import { useCamera } from '../../hooks/useCamera/useCamera';
import { useDeviceLibrary } from '../../hooks/useDeviceLibrary/useDeviceLibrary';
import { DeviceMedia } from '../../interfaces/media';
import { StackNavigationProp } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';

export const MenuAddMedia = ({
  empty,
  fieldKey,
  initialRoute,
  single = false,
  stateKey,
}: {
  empty: boolean;
  fieldKey: string;
  initialRoute: string;
  single: boolean;
  stateKey: string;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const [visible, setVisible] = useState(false);
  const { launch: launchCamera } = useCamera();
  const { launch: launchLibrary } = useDeviceLibrary();

  const close = useCallback(() => setVisible(false), []);
  const open = useCallback(() => setVisible(true), []);

  const handleCameraPress = useCallback(() => {
    launchCamera((image: DeviceMedia) => {
      navigation.navigate('EditMedia', {
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    });

    close();
  }, [close, fieldKey, initialRoute, launchCamera, navigation, single, stateKey]);

  const handleMediaLibraryPress = useCallback(() => {
    launchLibrary((image: DeviceMedia) => {
      navigation.navigate('EditMedia', {
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    });

    close();
  }, [close, fieldKey, initialRoute, launchLibrary, navigation, single, stateKey]);

  const handleCHonePress = useCallback(() => {
    navigation.navigate('AddCH1Media', {
      key: fieldKey,
      initialRoute,
      single,
      stateKey,
    });

    close();
  }, [close, stateKey, fieldKey, initialRoute, navigation, single]);

  const buttonLabel = useMemo(() => {
    const add = 'Add';
    const replace = 'Change';

    if (empty) {
      return add;
    }

    return single ? replace : add;
  }, [empty, single]);

  const icon = empty ? 'plus' : 'pencil';

  return (
    <Menu
      visible={visible}
      onDismiss={close}
      anchor={
        <Button
          compact
          icon={icon}
          mode="contained"
          onPress={open}
          labelStyle={{ ...styles.buttonLabelSmall }}
          style={{ ...styles.buttonSmall, marginHorizontal: 0 }}
        >
          {buttonLabel}
        </Button>
      }
    >
      <Menu.Item leadingIcon="camera" onPress={handleCameraPress} title="Camera" />
      <Menu.Item leadingIcon="folder" onPress={handleMediaLibraryPress} title="Device" />
      <Menu.Item leadingIcon="apps" onPress={handleCHonePress} title="CH ONE" />
    </Menu>
  );
};
