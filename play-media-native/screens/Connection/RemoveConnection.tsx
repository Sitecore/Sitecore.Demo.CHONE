import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Screen } from '../../features/Screen/Screen';
import { removeConnection } from '../../helpers/connections';
import { RootStackParamList } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RemoveConnection'>;

export const RemoveConnectionScreen = ({ navigation, route }: Props) => {
  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onRemove = useCallback(async () => {
    await removeConnection(route?.params?.connectionName).then(() => {
      navigation.goBack();
    });
  }, [navigation, route?.params?.connectionName]);

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
        <Text
          style={{
            maxWidth: '80%',
            textAlign: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text>Are you sure you want to remove </Text>
          <Text style={{ fontWeight: 'bold' }}>{route?.params?.connectionName}</Text>
          <Text> from your list of connections?</Text>
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onRemove}
          >
            Remove
          </Button>
        </View>
      </View>
    </Screen>
  );
};
