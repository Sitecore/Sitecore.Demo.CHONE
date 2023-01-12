import { useState } from "react";
import { Button, Image, View } from "react-native";
import { MediaTypeOptions, launchCameraAsync } from "expo-image-picker";

export default function CameraViewPicker() {
  const [image, setImage] = useState(null);

  const handleLaunchCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pick an image from camera roll"
        onPress={handleLaunchCamera}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
