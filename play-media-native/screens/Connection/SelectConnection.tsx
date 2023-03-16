import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

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

  const onAdd = useCallback(() => {
    navigation.navigate('AddConnection');
  }, [navigation]);

  const onRemove = useCallback(
    (connectionName: string) => {
      navigation.navigate('RemoveConnection', connectionName);
    },
    [navigation]
  );

  const onSelect = useCallback(
    (value: string) => {
      setSelectedConnectionName(value);
      setExpoSelectedConnection(connections.find((connection) => connection.name === value));
      navigation.navigate('MainTabs');
    },
    [connections, navigation]
  );

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
          marginBottom: theme.spacing.md,
        }}
      >
        <View style={{ paddingBottom: theme.spacing.md }}>
          <Logo />
        </View>
        <Text>
          <Text variant="bodyLarge">Select a </Text>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
            Content Hub ONE
          </Text>
          <Text variant="bodyLarge"> connection.</Text>
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
          <View style={{ paddingHorizontal: theme.spacing.xs, width: '100%' }}>
            {connectionOptions.map((item) => (
              <Pressable
                onPress={() => onSelect(item.name)}
                key={item.name}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor:
                    item.name === selectedConnectionName
                      ? theme.colors.yellow.DEFAULT
                      : theme.colors.white.DEFAULT,

                  height: 45,
                  width: '100%',
                  paddingLeft: theme.spacing.sm,
                }}
              >
                <View>
                  <Text variant="labelMedium" style={{ color: theme.colors.black.DEFAULT }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <IconButton
                    icon="delete"
                    onPress={() => onRemove(item.name)}
                    iconColor={theme.colors.black.DEFAULT}
                    size={28}
                    style={{ marginHorizontal: 0 }}
                  />
                  <IconButton
                    icon="square-edit-outline"
                    onPress={() => {}}
                    iconColor={theme.colors.black.DEFAULT}
                    size={28}
                    style={{ marginHorizontal: 0 }}
                  />
                </View>
              </Pressable>
            ))}
          </View>
          <Button
            icon="plus"
            mode="contained"
            onPress={onAdd}
            style={{ ...styles.button, marginTop: theme.spacing.sm, marginLeft: 'auto' }}
            labelStyle={styles.buttonLabel}
          >
            Add
          </Button>
        </>
      )}
    </Screen>
  );
};
