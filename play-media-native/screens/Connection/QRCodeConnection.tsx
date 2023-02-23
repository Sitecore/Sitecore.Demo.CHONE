import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { validateConnection } from '../../api/queries/validateConnection';
import { Screen } from '../../features/Screen/Screen';
import { storeConnection } from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { add } from '../../store/connections';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  failureTextMsg: {
    marginBottom: theme.spacing.sm,
  },
});

export const QRCodeConnectionScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isQRScanned, setIsQRScanned] = useState(false);
  const [isQRError, setIsQRError] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const handleQRCodeScan = useCallback(
    async ({ data }) => {
      setIsQRScanned(true);

      let qrConnectionObject: Connection;

      try {
        qrConnectionObject = JSON.parse(data);
      } catch (e: unknown) {
        setIsQRError(true);
        console.error(e);
        return;
      }

      const { name, apiKey, previewUrl, clientID, clientSecret } = qrConnectionObject;

      if (name && apiKey && previewUrl && clientID && clientSecret) {
        await validateConnection({ apiKey, previewUrl, clientID, clientSecret })
          .then(async () => {
            await storeConnection(qrConnectionObject).then(() => {
              add(qrConnectionObject);

              navigation.navigate('MainTabs');
            });
          })
          .catch((e) => {
            setIsQRError(true);
            console.error(e);
          });
      } else {
        setIsQRError(true);
      }
    },
    [navigation]
  );

  const handleScanAgainPress = useCallback(() => {
    setIsQRScanned(false);
    setIsQRError(false);
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

  const scanAgain = isQRScanned && isQRError && (
    <Screen centered>
      <Text style={pageStyles.failureTextMsg}>Adding a connection failed</Text>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={handleScanAgainPress}
      >
        Tap to Scan Again
      </Button>
    </Screen>
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
      {scanAgain}
    </>
  );
};
