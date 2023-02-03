import { useCallback } from "react";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { DeviceMedia } from "../../interfaces/media";
import { MEDIA_SOURCES } from "../../constants/media";

export const useDeviceLibrary = () => {
  const [status, requestPermissions] = useMediaLibraryPermissions();

  const handleLaunchLibrary = useCallback(
    async (callback: (image: DeviceMedia) => void) => {
      await requestPermissions();

      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        return null;
      } else {
        callback &&
          callback({ ...result.assets[0], source: MEDIA_SOURCES.LIBRARY });
      }
    },
    []
  );

  return { launch: handleLaunchLibrary, status };
};
