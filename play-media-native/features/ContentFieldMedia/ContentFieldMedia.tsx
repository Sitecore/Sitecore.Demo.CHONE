import { useCallback } from "react";
import { StyleProp, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { DeviceMedia, Media } from "../../interfaces/media";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { useCamera } from "../../hooks/useCamera/useCamera";
import { useDeviceLibrary } from "../../hooks/useDeviceLibrary/useDeviceLibrary";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { styles } from "../../theme/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { MediaItemListDisplay } from "../MediaItemListDisplay/MediaItemListDisplay";
import { theme } from "../../theme/theme";

export const ContentFieldMedia = ({
  fieldKey,
  fieldTitle,
  initialRoute,
  style,
}: {
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  style?: StyleProp<any>;
}) => {
  const { eventFields } = useEventFields();
  const { launch: launchCamera } = useCamera();
  const { launch: launchLibrary } = useDeviceLibrary();
  const navigation = useNavigation<StackNavigationProp>();

  const handleCameraPress = useCallback(
    (stateKey: string) => {
      launchCamera((image: DeviceMedia) => {
        navigation.navigate("EditMedia", {
          initialRoute,
          image,
          key: stateKey,
        });
      });
    },
    [launchCamera, navigation]
  );

  const handleMediaLibraryPress = useCallback(
    (stateKey: string) => {
      launchLibrary((image: DeviceMedia) => {
        navigation.navigate("EditMedia", {
          initialRoute,
          image,
          key: stateKey,
        });
      });
    },
    [launchLibrary, navigation]
  );

  const onAddMedia = useCallback((key: string) => {
    navigation.navigate("AddCH1Media", { key, initialRoute });
  }, []);

  return (
    <View style={style}>
      <Text variant="labelSmall" style={{ marginBottom: theme.spacing.xs }}>
        {fieldTitle}
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          compact
          mode="outlined"
          onPress={() => handleCameraPress(fieldKey)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Camera
        </Button>
        <Button
          compact
          mode="outlined"
          onPress={() => handleMediaLibraryPress(fieldKey)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Device
        </Button>
        <Button
          compact
          mode="contained"
          onPress={() => onAddMedia(fieldKey)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          CH ONE
        </Button>
      </View>
      <DraggableList
        items={eventFields.relatedMedia}
        renderItem={(item: Media) => <MediaItemListDisplay item={item} />}
      />
    </View>
  );
};
