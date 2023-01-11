import { StyleSheet } from "react-native";
import { Camera } from "react-native-vision-camera";
import { useCameraDevices } from "react-native-vision-camera/lib/typescript/hooks/useCameraDevices";

const cameraStyle = StyleSheet.create({
  container: { position: "absolute", top: 0, bottom: 0, right: 0, left: 0 },
});

export const CameraView = () => {
  const devices = useCameraDevices();
  console.log("devices", devices);
  const device = devices.back;
  return (
    <Camera device={device} isActive={true} style={cameraStyle.container} />
  );
};
