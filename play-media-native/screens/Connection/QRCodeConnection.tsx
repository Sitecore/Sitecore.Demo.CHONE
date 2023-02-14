import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Screen } from "../../features/Screen/Screen";

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const QRCodeConnectionScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isQRScanned, setIsQRScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const handleQRCodeScan = useCallback(({ type, data }) => {
    setIsQRScanned(true);
  }, []);

  if (!hasPermission) {
    return (
      <Screen centered>
        <Text>No camera permission granted</Text>
      </Screen>
    );
  }

  return (
    <View style={pageStyles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={isQRScanned ? undefined : handleQRCodeScan}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};
