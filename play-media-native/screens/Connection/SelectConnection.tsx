import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { BackHandler, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { useQueryClient } from 'react-query';

import connectionScreenStyles from './styles';
import { MaterialIcon } from '../../components/Icon/MaterialIcon';
import { Logo } from '../../components/Logo/Logo';
import { CONNECTIONS_MAX_LIMIT } from '../../constants/connections';
import { Screen } from '../../features/Screen/Screen';
import {
  getConnections,
  getSelectedConnection,
  setSelectedConnection as setExpoSelectedConnection,
} from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { RootStackParamList } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const pageStyles = StyleSheet.create({
  warningContainer: {
    backgroundColor: theme.colors.yellow.dark,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
  },
  warningIcon: {
    marginRight: theme.spacing.xs,
  },
  warningText: {
    flexShrink: 1,
    color: theme.colors.black.DEFAULT,
  },
});

type Props = NativeStackScreenProps<RootStackParamList, 'SelectConnection'>;

export const SelectConnectionScreen = ({ navigation, route }: Props) => {
  const queryClient = useQueryClient();

  const [hideLogo] = useState(route?.params?.hideLogo);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnectionName, setSelectedConnectionName] = useState<string>();
  const [isNoConnectionAvailable, setIsNoConnectionAvailable] = useState(true);
  const [isConnectionLimitReached, setIsConnectionLimitReached] = useState(false);

  // Disable hardware back button
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => backHandler.remove();
    }, [])
  );

  // Retrieve the saved connections from Expo Secure Store
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const savedConnections = await getConnections();
        setConnections(savedConnections);
        setIsConnectionLimitReached(savedConnections.length === CONNECTIONS_MAX_LIMIT);
      })();
    }, [])
  );

  // If there is at least one connection, set it as the default and update the flag
  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (connections.length > 0) {
          const selectedConnection = await getSelectedConnection();

          setSelectedConnectionName(selectedConnection?.name || connections[0]?.name);
          setExpoSelectedConnection(selectedConnection || connections[0]);

          setIsNoConnectionAvailable(false);
        } else {
          setIsNoConnectionAvailable(true);
        }
      })();
    }, [connections])
  );

  const onAdd = useCallback(() => {
    navigation.push('AddConnection', {
      title: 'Connections',
      subtitle: 'Add a connection',
    });
  }, [navigation]);

  const onEdit = useCallback(
    (connection: Connection) => {
      navigation.push('ManualConnection', {
        connection,
        isEdit: true,
        subtitle: 'Edit connection details',
        title: connection?.name,
      });
    },
    [navigation]
  );

  const onRemove = useCallback(
    (connectionName: string) => {
      navigation.push('RemoveConnection', {
        connectionName,
        subtitle: 'Delete connection?',
        title: connectionName,
      });
    },
    [navigation]
  );

  const onSelect = useCallback(
    async (value: string) => {
      setSelectedConnectionName(value);
      await setExpoSelectedConnection(
        connections.find((connection) => connection.name === value)
      ).then(() => {
        queryClient.invalidateQueries();
        navigation.navigate('MainTabs');
      });
    },
    [connections, navigation, queryClient]
  );

  const connectionLimitWarning = isConnectionLimitReached && (
    <View style={pageStyles.warningContainer}>
      <MaterialIcon
        name="alert-outline"
        color={theme.colors.black.DEFAULT}
        size={20}
        style={pageStyles.warningIcon}
      />
      <Text style={pageStyles.warningText}>
        The connection limit has been reached. Please remove one of your older connections first in
        case you want to add a new one.
      </Text>
    </View>
  );

  return (
    <Screen centered>
      <StatusBar barStyle="light-content" />
      {!hideLogo && (
        <View style={{ paddingBottom: theme.spacing.md }}>
          <Logo />
        </View>
      )}
      {isNoConnectionAvailable ? (
        <View
          style={{
            marginBottom: theme.spacing.xs,
          }}
        >
          <Text variant="labelMedium" style={connectionScreenStyles.title}>
            No available{' '}
            <Text variant="labelMedium" style={{ fontFamily: theme.fontFamily.bold }}>
              Content Hub ONE{' '}
            </Text>
            connections.
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              marginBottom: theme.spacing.md,
            }}
          >
            <Text variant="labelMedium" style={connectionScreenStyles.title}>
              Select a{' '}
              <Text variant="labelMedium" style={{ fontFamily: theme.fontFamily.bold }}>
                Content Hub ONE{' '}
              </Text>
              connection.
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
                <View style={{ flexShrink: 1 }}>
                  <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.black.DEFAULT }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
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
                    onPress={() => onEdit(item)}
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
        style={[
          {
            ...styles.button,
            marginTop: theme.spacing.sm,
            alignSelf: isNoConnectionAvailable ? 'center' : 'flex-end',
          },
          isConnectionLimitReached && styles.buttonDisabled,
        ]}
        labelStyle={styles.buttonLabel}
        disabled={isConnectionLimitReached}
      >
        Add
      </Button>
      {connectionLimitWarning}
    </Screen>
  );
};
