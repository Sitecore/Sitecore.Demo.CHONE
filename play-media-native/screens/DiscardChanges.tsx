import { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const DiscardChangesScreen = ({ navigation, route }) => {
  const message = route?.params?.message || 'Are you sure?';
  const stateKey = route?.params?.stateKey;
  const redirectRoute = route?.params?.redirectRoute || 'MainTabs';

  const { reset } = useContentItems();

  const onDiscard = useCallback(() => {
    if (stateKey) {
      reset({ id: stateKey });
    }

    navigation.navigate(redirectRoute, {
      id: route?.params?.id,
      title: route?.params?.title,
    });
  }, [navigation, redirectRoute, reset, route?.params?.id, route?.params?.title, stateKey]);

  const onContinue = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Screen centered>
      <Text style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }} variant="titleMedium">
        {message}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
    </Screen>
  );
};
