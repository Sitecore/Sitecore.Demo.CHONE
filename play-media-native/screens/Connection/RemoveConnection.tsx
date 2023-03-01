import { useCallback, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { MultiSelectChips } from '../../components/MultiSelectChips/MultiSelectChips';
import { Screen } from '../../features/Screen/Screen';
import { removeConnections } from '../../helpers/connections';
import { useConnections } from '../../hooks/useConnections/useConnections';
import { theme } from '../../theme/theme';

export const RemoveConnectionScreen = () => {
  const { connections, remove } = useConnections();
  const [connectionOptions, setConnectionOptions] = useState(
    connections.map((item) => ({
      ...item,
      label: item.name,
      value: item.name,
      selected: false,
    }))
  );

  const selectedCount = connectionOptions.filter((item) => item.selected)?.length;

  const onSelect = useCallback((connection) => {
    setConnectionOptions((prevConnections) =>
      prevConnections.map((item) =>
        connection.name === item.name ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const onRemove = useCallback(async () => {
    const selectedConnections = connectionOptions.filter((connection) => connection.selected);

    await removeConnections(selectedConnections).then(() => {
      remove(selectedConnections);
      setConnectionOptions((prevOptions) =>
        prevOptions.filter((option) => !selectedConnections.includes(option))
      );
    });
  }, [connectionOptions, remove]);

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
          Select connection(s) to be removed.
        </Text>
        <MultiSelectChips items={connectionOptions} onSelect={onSelect} />
        <Button
          disabled={selectedCount === 0}
          icon="delete"
          mode="contained"
          onPress={onRemove}
          style={{ marginTop: theme.spacing.xl }}
        >
          {`Remove ${selectedCount || ''}`}
        </Button>
      </View>
    </Screen>
  );
};
