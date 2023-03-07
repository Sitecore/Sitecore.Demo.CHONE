import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { BottomFAB } from '../../components/BottomFAB/BottomFAB';
import { Icon } from '../../components/Icon/Icon';
import { Logo } from '../../components/Logo/Logo';
import { Select } from '../../components/Select/Select';
import { Screen } from '../../features/Screen/Screen';
import {
  getConnections,
  setSelectedConnection as setExpoSelectedConnection,
} from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const fabAddStyle = {
  bottom: 75,
};

export const SelectConnectionScreen = ({ navigation }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnectionName, setSelectedConnectionName] = useState<string>();
  const [isNoConnectionAvailable, setIsNoConnectionAvailable] = useState(true);
  const isScreenVisible = useIsFocused();

  // Retrieve the saved connections from Expo Secure Store
  useEffect(() => {
    if (isScreenVisible) {
      (async () => {
        const savedConnections = await getConnections();
        setConnections(savedConnections);
      })();
    }
  }, [isScreenVisible]);

  // If there is at least one connection, set it as the default and update the flag
  useEffect(() => {
    if (connections.length > 0) {
      setSelectedConnectionName(connections[0]?.name);
      setExpoSelectedConnection(connections[0]);

      setIsNoConnectionAvailable(false);
    } else {
      setIsNoConnectionAvailable(true);
    }
  }, [connections]);

  const onFabAddClick = useCallback(() => {
    navigation.navigate('AddConnection');
  }, [navigation]);

  const onFabRemoveClick = useCallback(() => {
    navigation.navigate('RemoveConnection');
  }, [navigation]);

  const onSelect = useCallback(
    (value: string) => {
      setSelectedConnectionName(value);
      setExpoSelectedConnection(connections.find((connection) => connection.name === value));
    },
    [connections]
  );

  const onConnect = useCallback(() => {
    navigation.navigate('MainTabs');
  }, [navigation]);

  const connectionOptions = useMemo(
    () =>
      Array.isArray(connections)
        ? connections.map((item) => ({
            ...item,
            label: item.name,
            value: item.name,
          }))
        : [],
    [connections]
  );

  return (
    <Screen centered>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <View>
          <Logo />
        </View>
        <Text style={{ maxWidth: '80%', textAlign: 'center' }}>
          Connect to a saved Content Hub One instance.
        </Text>
      </View>
      {isNoConnectionAvailable ? (
        <View
          style={{
            justifyContent: 'center',
            marginBottom: theme.spacing.xs,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="warning-outline"
              color={theme.colors.yellow.DEFAULT}
              size={25}
              style={{ marginRight: theme.spacing.xxs }}
            />
            <Text style={{ textAlign: 'center' }}>No connections available yet!</Text>
          </View>
          <Text style={{ textAlign: 'center' }} variant="labelMedium">
            Add one by clicking on the + button below.
          </Text>
        </View>
      ) : (
        <>
          <Select
            items={connectionOptions}
            onChange={onSelect}
            selectedValue={selectedConnectionName}
            style={{ width: '90%', marginBottom: theme.spacing.xxs }}
          />
          <Button
            icon="connection"
            mode="contained"
            onPress={onConnect}
            style={{ ...styles.button, marginTop: theme.spacing.xs }}
            labelStyle={styles.buttonLabel}
          >
            Connect
          </Button>
        </>
      )}
      <BottomFAB icon="plus" onPress={onFabAddClick} style={fabAddStyle} />
      <BottomFAB disabled={isNoConnectionAvailable} icon="delete" onPress={onFabRemoveClick} />
    </Screen>
  );
};
