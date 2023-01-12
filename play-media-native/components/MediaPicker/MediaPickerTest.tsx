import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  CameraOptions,
  ImageLibraryOptions,
} from "react-native-image-picker/lib/typescript/types";

const cameraStyle = StyleSheet.create({
  container: { position: "absolute", top: 0, bottom: 0, right: 0, left: 0 },
});

const options = {
  mediaType: "photo",
  saveToPhotos: true,
};

export const MediaPicker = () => {
  const handleImageLibrary = useCallback(async () => {
    const result = await launchImageLibrary(options as ImageLibraryOptions)
      .then(() => console.log("result", result))
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleCamera = useCallback(async () => {
    const result = await launchCamera(options as CameraOptions)
      .then(() => console.log("result", result))
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleRemoteMedia = useCallback(async () => {}, []);

  console.log("\n\n");
  console.log("\n\n");

  return (
    <View>
      <Button icon="camera" mode="outlined" onPress={handleCamera}>
        Camera
      </Button>
      {/* card-search */}
      <Button
        icon="cellphone"
        mode="contained"
        onPress={() => {
          handleImageLibrary;
        }}
      >
        Device Library
      </Button>
      <Button icon="apps" mode="contained" onPress={() => {}}>
        Media API
      </Button>
    </View>
  );
};
