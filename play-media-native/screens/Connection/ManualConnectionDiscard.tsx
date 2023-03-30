import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import connectionScreenStyles from './styles';
import { Screen } from '../../features/Screen/Screen';
import { RootStackParamList } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ManualConnectionDiscard'>;

export const ManualConnectionDiscardScreen = ({ navigation, route }: Props) => {
  const isEdit = route?.params?.isEdit;

  const message = useMemo(() => {
    return (
      <Text variant="labelMedium" style={connectionScreenStyles.title}>
        Are you sure you want to discard{' '}
        <Text variant="labelMedium">the {isEdit ? 'changes' : 'new connection'} </Text>
        or continue editing?
      </Text>
    );
  }, [isEdit]);

  const onContinue = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDiscard = useCallback(() => {
    if (isEdit) {
      navigation.pop(2);
    } else {
      navigation.pop(3);
    }
  }, [navigation, isEdit]);

  return (
    <Screen centered>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              maxWidth: '80%',
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            {message}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onDiscard}
          >
            Discard
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onContinue}
          >
            Continue
          </Button>
        </View>
      </View>
    </Screen>
  );
};
