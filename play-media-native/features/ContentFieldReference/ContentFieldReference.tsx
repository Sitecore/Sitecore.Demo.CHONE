import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { StyleProp, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { DraggableList } from '../../components/DraggableList/DraggableList';
import { useEventFields } from '../../hooks/useEventFields/useEventFields';
import { StackNavigationProp } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { useAthleteFields } from '../../hooks/useAthleteFields/useAthleteFields';

export const ContentFieldReference = ({
  addRoute,
  contentType,
  createRoute,
  fieldKey,
  fieldTitle,
  initialRoute,
  renderItem,
  single = false,
  style,
}: {
  addRoute: string;
  contentType: string;
  createRoute: string;
  fieldKey: string;
  fieldTitle: string;
  initialRoute: string;
  renderItem: (item: any) => JSX.Element;
  single?: boolean;
  style?: StyleProp<any>;
}) => {
  const { edit: editEventFields, eventFields } = useEventFields();
  const { edit: editAthleteFields, athleteFields } = useAthleteFields();

  const navigation = useNavigation<StackNavigationProp>();

  const reorderItems = useCallback((items: any) => {
    if (contentType === CONTENT_TYPES.EVENT) {
      editEventFields({key: fieldKey, value: items})
    } else {
      editAthleteFields({key: fieldKey, value: items})
    }
  }, [contentType, editAthleteFields, editEventFields, fieldKey])

  // const handleCreateNew = useCallback(() => {
  //   navigation.navigate(createRoute, {
  //     key: fieldKey,
  //     contentType,
  //     initialRoute,
  //   });
  // }, [contentType, createRoute, fieldKey, initialRoute, navigation]);

  const handleAddExisting = useCallback(() => {
    navigation.navigate(addRoute, {
      key: fieldKey,
      contentType,
      initialRoute,
      single,
    });
  }, [addRoute, contentType, fieldKey, initialRoute, navigation, single]);

  const items = useMemo(() => {
    if (contentType === CONTENT_TYPES.EVENT) {
      return eventFields[fieldKey]
    }

    return athleteFields[fieldKey];
  }, [athleteFields, contentType, eventFields, fieldKey])

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
        {/* <Button
          compact
          mode="outlined"
          onPress={handleCreateNew}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Create New
        </Button> */}
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
      <DraggableList items={items} onDragEnd={reorderItems} renderItem={renderItem} />
    </View>
  );
};
