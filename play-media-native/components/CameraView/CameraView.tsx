// import { useState } from "react";
// import { Image, View } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Button } from "react-native-paper";

// export const MediaPicker = () => {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View>
//       <Button icon="camera" mode="outlined" onPress={pickImage}>
//         Camera
//       </Button>
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//     </View>
//   );
// };

import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { BottomFAB } from "../BottomFAB/BottomFAB";

const cameraStyle = StyleSheet.create({
  container: { position: "absolute", top: 0, bottom: 0, right: 0, left: 0 },
});

export const CameraView = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const toggleCameraType = useCallback(() => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }, []);

  useEffect(() => {
    const requestUserPermission = async () => {
      await requestPermission();
    };

    requestUserPermission();
  }, []);

  //   console.log("\n\n");
  //   console.log("permission", permission);
  //   console.log("\n\n");

  if (!permission) {
    return (
      <Text>Play! Media requires permissions to add media from Camera.</Text>
    );
  }

  return (
    <View>
      <Camera style={{ height: "100%", width: "100%" }} type={type}>
        <BottomFAB icon="camera" onPress={toggleCameraType} />
      </Camera>
    </View>
  );
};
