import { useCallback } from "react";
import { StyleProp, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { styles } from "../../theme/styles";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { theme } from "../../theme/theme";

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
  const { eventFields } = useEventFields();
  const navigation = useNavigation<StackNavigationProp>();

  const handleCreateNew = useCallback(() => {
    navigation.navigate(createRoute, {
      key: fieldKey,
      contentType,
      initialRoute,
    });
  }, [contentType, createRoute, fieldKey, initialRoute, navigation]);

  const handleAddExisting = useCallback(() => {
    navigation.navigate(addRoute, {
      key: fieldKey,
      contentType,
      initialRoute,
      single,
    });
  }, [addRoute, contentType, fieldKey, initialRoute, navigation, single]);

  return (
    <View style={style}>
      <Text variant="labelSmall" style={{ marginBottom: theme.spacing.xs }}>
        {fieldTitle}
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: theme.spacing.xs,
        }}
      >
        <Button
          compact
          mode="outlined"
          onPress={handleCreateNew}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Create New
        </Button>
        <Button
          compact
          mode="contained"
          onPress={handleAddExisting}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Add Existing
        </Button>
      </View>
      <DraggableList items={eventFields[fieldKey]} renderItem={renderItem} />
    </View>
  );
};
