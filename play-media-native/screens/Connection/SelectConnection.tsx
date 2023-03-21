import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

import { Logo } from '../../components/Logo/Logo';
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
  useFocusEffect(
    useCallback(() => {
      if (connections.length > 0) {
        setSelectedConnectionName(connections[0]?.name);
        setExpoSelectedConnection(connections[0]);

        setIsNoConnectionAvailable(false);
      } else {
        setIsNoConnectionAvailable(true);
      }
    }, [connections])
  );

  const onAdd = useCallback(() => {
    navigation.navigate('AddConnection');
  }, [navigation]);

  const onRemove = useCallback(
    (connectionName: string) => {
      navigation.navigate('RemoveConnection', { connectionName });
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

  return (
    <Screen centered>
      <StatusBar barStyle="light-content" />
      <View style={{ paddingBottom: theme.spacing.md }}>
        <Logo />
      </View>
      {isNoConnectionAvailable ? (
        <View
          style={{
            justifyContent: 'center',
            marginBottom: theme.spacing.xs,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>
              <Text>No available </Text>
              <Text style={{ fontWeight: 'bold' }}>Content Hub ONE </Text>
              <Text>connections.</Text>
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Text>
              <Text variant="bodyLarge">Select a </Text>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                Content Hub ONE
              </Text>
              <Text variant="bodyLarge"> connection.</Text>
            </Text>
          </View>
          <View style={{ paddingHorizontal: theme.spacing.xs, width: '100%' }}>
            {connections.map((item) => (
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
                  marginVertical: theme.spacing.xxs,
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
        </>
      )}
      <Button
        icon="plus"
        mode="contained"
        onPress={onAdd}
        style={{
          ...styles.button,
          marginTop: theme.spacing.sm,
          marginLeft: isNoConnectionAvailable ? null : 'auto',
        }}
        labelStyle={styles.buttonLabel}
      >
        Add
      </Button>
    </Screen>
  );
};
