import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { FieldLabel } from '../../components/FieldLabel/FieldLabel';
import {
  getReferenceFieldButtonLabel,
  getReferenceFieldIcon,
} from '../../helpers/contentItemHelper';
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
  required,
  single = false,
  stateKey,
  style,
}: {
  addRoute: string;
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  renderItem: (item: any) => JSX.Element;
  required?: boolean;
  single?: boolean;
  stateKey: string;
  style?: StyleProp<any>;
}) => {
  const { contentItems, edit } = useContentItems();
  const navigation = useNavigation<StackNavigationProp>();
  const empty = Array.isArray(contentItems[stateKey][fieldKey])
    ? contentItems[stateKey][fieldKey]?.length === 0
    : !contentItems[stateKey][fieldKey];

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

  const buttonLabel = getReferenceFieldButtonLabel(empty, single);
  const icon = getReferenceFieldIcon(empty, single);

  return (
    <View style={style}>
      <Divider
        style={{ backgroundColor: theme.colors.gray.light, marginBottom: theme.spacing.xs }}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xs,
        }}
      >
        <FieldLabel required={required} single={single} title={fieldTitle} />
        <Button
          compact
          icon={icon}
          mode="contained"
          onPress={handleAddExisting}
          style={{ ...styles.buttonSmall, marginRight: 0 }}
          labelStyle={styles.buttonLabelSmall}
        >
          {buttonLabel}
        </Button>
      </View>
      {content}
    </View>
  );
};
