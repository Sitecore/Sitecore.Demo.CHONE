import { faEdit, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import connectionStyles from './styles';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { RootStackParamList } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';

const pageStyles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  btnLabel: {
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xxs,
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.xs,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: theme.spacing.xxs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    margin: theme.spacing.xxs,
    width: 140,
  },
  buttonContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const iconSize = 30;

type Props = NativeStackScreenProps<RootStackParamList, 'AddConnection'>;

export const AddConnectionScreen = ({ navigation }: Props) => {
  const handleManualBtnPress = useCallback(() => {
    navigation.push('ManualConnection', {
      subtitle: 'Add connection details',
      title: 'Untitled connection',
    });
  }, [navigation]);

  const handleQRCodeBtnPress = useCallback(() => {
    navigation.push('QRCodeConnection', { subtitle: 'Add a connection', title: 'QR Code Scanner' });
  }, [navigation]);

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <View style={connectionStyles.container}>
        <Text variant="labelMedium" style={connectionStyles.title}>
          Connect to a{' '}
          <Text variant="labelMedium" style={connectionStyles.chOneText}>
            Content Hub ONE{' '}
          </Text>
          instance via:
        </Text>
      </View>
      <View style={pageStyles.btnContainer}>
        <TouchableRipple
          onPress={handleManualBtnPress}
          style={[
            pageStyles.buttonContainer,
            {
              borderColor: theme.colors.yellow.DEFAULT,
            },
          ]}
        >
          <View style={pageStyles.buttonContent}>
            <FontAwesomeIcon icon={faEdit} color={theme.colors.yellow.DEFAULT} size={iconSize} />
            <Text
              variant="labelMedium"
              style={[
                pageStyles.btnLabel,
                {
                  color: theme.colors.yellow.DEFAULT,
                },
              ]}
            >
              Manual
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={handleQRCodeBtnPress}
          style={[
            pageStyles.buttonContainer,
            {
              backgroundColor: theme.colors.yellow.DEFAULT,
            },
          ]}
        >
          <View style={pageStyles.buttonContent}>
            <FontAwesomeIcon icon={faQrcode} color={theme.colors.black.DEFAULT} size={iconSize} />
            <Text
              variant="labelMedium"
              style={[
                pageStyles.btnLabel,
                {
                  color: theme.colors.black.DEFAULT,
                },
              ]}
            >
              QR Code
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </KeyboardAwareScreen>
  );
};
