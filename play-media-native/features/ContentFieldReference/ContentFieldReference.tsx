import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { StackNavigationProp } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

export const ContentFieldReference = ({
  addRoute,
  fieldKey,
  fieldTitle,
  initialRoute,
  renderItem,
  single = false,
  stateKey,
  style,
}: {
  addRoute: string;
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  renderItem: (item: any) => JSX.Element;
  single?: boolean;
  stateKey: string;
  style?: StyleProp<any>;
}) => {
  const { contentItems, edit } = useContentItems();
  const navigation = useNavigation<StackNavigationProp>();

  const reorderItems = useCallback(
    (items: any) => {
      edit({ id: stateKey, key: fieldKey, value: items });
    },
    [edit, fieldKey, stateKey]
  );

  const handleAddExisting = useCallback(() => {
    navigation.navigate(addRoute, {
      key: fieldKey,
      initialRoute,
      single,
      stateKey,
    });
  }, [addRoute, fieldKey, initialRoute, navigation, single, stateKey]);

  const items = useMemo(() => {
    return contentItems[stateKey][fieldKey];
  }, [contentItems, fieldKey, stateKey]);

  const content = useMemo(
    () =>
      Array.isArray(items) ? (
        <DraggableList items={items} onDragEnd={reorderItems} renderItem={renderItem} />
      ) : (
        items && renderItem(items)
      ),
    [items, reorderItems, renderItem]
  );

  return (
    <View style={style}>
      <Text variant="labelSmall" style={{ marginBottom: theme.spacing.xs }}>
        {fieldTitle}
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: theme.spacing.xs,
        }}
      >
        <Button
          compact
          icon="plus"
          mode="contained"
          onPress={handleAddExisting}
          style={{ ...styles.button, marginRight: 0 }}
          labelStyle={styles.buttonLabel}
        >
          Add
        </Button>
      </View>
      {content}
    </View>
  );
};
