import { faEdit, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import connectionStyles from './styles';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const pageStyles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  btnLabel: {
    fontSize: theme.fontSize.sm,
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.xs,
  },
});

export const AddConnectionScreen = ({ navigation }) => {
  const handleManualBtnPress = useCallback(() => {
    navigation.navigate('ManualConnection');
  }, [navigation]);
  const handleQRCodeBtnPress = useCallback(() => {
    navigation.navigate('QRCodeConnection');
  }, [navigation]);

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <View style={connectionStyles.container}>
        <Text style={connectionStyles.title}>
          Connect to a<Text style={connectionStyles.chOneText}> Content Hub ONE </Text>
          instance via:
        </Text>
      </View>
      <View style={pageStyles.btnContainer}>
        <Button
          icon={({ size }) => (
            <FontAwesomeIcon icon={faEdit} color={theme.colors.yellow.DEFAULT} size={size} />
          )}
          mode="outlined"
          style={styles.button}
          contentStyle={pageStyles.btnContent}
          labelStyle={[styles.buttonLabel, pageStyles.btnLabel]}
          onPress={handleManualBtnPress}
        >
          Manual
        </Button>
        <Button
          icon={({ size }) => (
            <FontAwesomeIcon icon={faQrcode} color={theme.colors.black.DEFAULT} size={size} />
          )}
          mode="contained"
          style={styles.button}
          contentStyle={pageStyles.btnContent}
          labelStyle={[styles.buttonLabel, pageStyles.btnLabel]}
          onPress={handleQRCodeBtnPress}
        >
          QR code
        </Button>
      </View>
    </KeyboardAwareScreen>
  );
};
