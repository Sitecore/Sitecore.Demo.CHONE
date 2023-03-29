import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { Button, Menu } from 'react-native-paper';

import {
  getReferenceFieldButtonLabel,
  getReferenceFieldIcon,
} from '../../helpers/contentItemHelper';
import { useCamera } from '../../hooks/useCamera/useCamera';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
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
  headerTitle = '',
  fieldTitle,
}: {
  empty: boolean;
  fieldKey: string;
  initialRoute: string;
  single: boolean;
  stateKey: string;
  headerTitle: string;
  fieldTitle?: string;
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const [visible, setVisible] = useState(false);
  const { launch: launchCamera } = useCamera();
  const { launch: launchLibrary } = useDeviceLibrary();
  const { contentItems } = useContentItems();

  const close = useCallback(() => setVisible(false), []);
  const open = useCallback(() => setVisible(true), []);

  const headerSubtitle = useMemo(() => {
    return `${single && contentItems[stateKey][fieldKey] ? 'Change' : 'Add'} ${
      fieldTitle.toLowerCase() || 'media'
    }`;
  }, [contentItems, fieldKey, single, stateKey, fieldTitle]);

  const handleCameraPress = useCallback(() => {
    launchCamera((image: DeviceMedia) => {
      navigation.navigate('EditMedia', {
        title: headerTitle,
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    });

    close();
  }, [close, fieldKey, initialRoute, launchCamera, navigation, single, stateKey, headerTitle]);

  const handleMediaLibraryPress = useCallback(() => {
    launchLibrary((image: DeviceMedia) => {
      navigation.navigate('EditMedia', {
        title: headerTitle,
        initialRoute,
        image,
        key: fieldKey,
        single,
        stateKey,
      });
    });

    close();
  }, [close, fieldKey, initialRoute, launchLibrary, navigation, single, stateKey, headerTitle]);

  const handleCHonePress = useCallback(() => {
    navigation.navigate('AddCH1Media', {
      title: headerTitle,
      subtitle: headerSubtitle,
      key: fieldKey,
      initialRoute,
      single,
      stateKey,
    });

    close();
  }, [navigation, headerTitle, headerSubtitle, fieldKey, initialRoute, single, stateKey, close]);

  const buttonLabel = getReferenceFieldButtonLabel(empty, single);
  const icon = getReferenceFieldIcon(empty, single);

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
