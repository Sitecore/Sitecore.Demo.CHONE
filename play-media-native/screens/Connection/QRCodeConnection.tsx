import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Screen } from "../../features/Screen/Screen";
import { Connection } from "../../interfaces/connections";
import { validateConnection } from "../../api/queries/validateConnection";
import { storeConnection } from "../../helpers/connections";
import { add } from "../../store/connections";
import { styles } from "../../theme/styles";

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

  const handleQRCodeScan = useCallback(async ({ data }) => {
    const qrConnectionObject: Connection = JSON.parse(data);
    const { name, apiKey, previewUrl, clientID, clientSecret } =
      qrConnectionObject;

    if (name && apiKey && previewUrl && clientID && clientSecret) {
      await validateConnection({ apiKey, previewUrl, clientID, clientSecret })
        .then(async () => {
          await storeConnection(qrConnectionObject).then(() => {
            add(qrConnectionObject);

            navigation.navigate("MainTabs");
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }

    setIsQRScanned(true);
  }, []);

  const qrCodeScanner = !isQRScanned && (
    <View style={pageStyles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={isQRScanned ? undefined : handleQRCodeScan}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );

  if (!hasPermission) {
    return (
      <Screen centered>
        <Text>No camera permission granted</Text>
      </Screen>
    );
  }

  return (
    <>
      {qrCodeScanner}
    </>
  );
};
