import { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { MultiSelectChips } from '../../components/MultiSelectChips/MultiSelectChips';
import { Screen } from '../../features/Screen/Screen';
import { getConnections, removeConnections } from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { theme } from '../../theme/theme';

type ConnectionOption = Connection & {
  label: string;
  value: string;
  selected: boolean;
};

export const RemoveConnectionScreen = () => {
  const [connectionOptions, setConnectionOptions] = useState<ConnectionOption[]>([]);

  // Retrieve saved connections from Expo Secure Store and map them to connection options
  useEffect(() => {
    (async () => {
      const savedConnections = await getConnections();
      setConnectionOptions(
        savedConnections.map((item) => ({
          ...item,
          label: item.name,
          value: item.name,
          selected: false,
        }))
      );
    })();
  }, []);

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
      setConnectionOptions((prevOptions) =>
        prevOptions.filter((option) => !selectedConnections.includes(option))
      );
    });
  }, [connectionOptions]);

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
