import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import connectionStyles from './styles';
import { validateConnection } from '../../api/queries/validateConnection';
import { ADD_CONNECTION_SUCCESS_MESSAGE_TIMEOUT } from '../../constants/connections';
import { Screen } from '../../features/Screen/Screen';
import { getConnections, storeConnection } from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { RootStackParamList } from '../../interfaces/navigators';
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

type Props = NativeStackScreenProps<RootStackParamList, 'QRCodeConnection'>;

export const QRCodeConnectionScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isQRScanned, setIsQRScanned] = useState(false);
  const [isQRError, setIsQRError] = useState(false);
  const [nameExistsError, setNameExistsError] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);
  const [connectionName, setConnectionName] = useState('');
  const [isValidating, setIsValidating] = useState(false);

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
      setConnectionName(name);
      const existingConnections = await getConnections();
      const nameAlreadyExists = !!existingConnections.find(
        (connection) => connection.name === name
      );

      if (nameAlreadyExists) {
        setIsQRError(true);
        setNameExistsError(true);
        return;
      }

      if (name && apiKey && previewUrl && clientID && clientSecret) {
        setIsValidating(true);

        await validateConnection({ apiKey, previewUrl, clientID, clientSecret })
          .then(async () => {
            await storeConnection(qrConnectionObject).then(() => {
              setIsValidating(false);
              setShowSuccessView(true);

              setTimeout(() => {
                navigation.navigate('MainTabs');
              }, ADD_CONNECTION_SUCCESS_MESSAGE_TIMEOUT);
            });
          })
          .catch((e) => {
            setIsValidating(false);
            setIsQRError(true);
            console.error('Validating the connection failed with error', e);
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

  const validationMsg = isValidating && (
    <Screen centered>
      <Text>Validating the connection...</Text>
    </Screen>
  );

  const scanAgain = isQRScanned && isQRError && (
    <Screen centered>
      <Text>Adding a connection failed!</Text>
      {nameExistsError && <Text>The scanned connection name already exists.</Text>}
      <Button
        mode="contained"
        style={[styles.button, { marginTop: theme.spacing.sm }]}
        labelStyle={styles.buttonLabel}
        onPress={handleScanAgainPress}
      >
        Tap to Scan Again
      </Button>
    </Screen>
  );

  const successView = useMemo(() => {
    const successMessage = (
      <>
        <Text>
          <Text>Connection</Text>
          <Text style={connectionStyles.chOneText}> {connectionName}</Text>
          <Text> was successfully added!</Text>
        </Text>
      </>
    );

    return showSuccessView && <Screen centered>{successMessage}</Screen>;
  }, [connectionName, showSuccessView]);

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
      {validationMsg}
      {successView}
      {scanAgain}
    </>
  );
};
