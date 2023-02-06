import { useCallback } from "react";
import { StyleProp, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Media } from "../../interfaces/media";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { styles } from "../../theme/styles";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { MediaItemListDisplay } from "../MediaItemListDisplay/MediaItemListDisplay";
import { theme } from "../../theme/theme";

export const ContentFieldReference = ({
  addRoute,
  createRoute,
  fieldKey,
  fieldTitle,
  renderItem,
  style,
}: {
  addRoute: string;
  createRoute: string;
  fieldKey: string;
  fieldTitle: string;
  renderItem: (item: any) => JSX.Element;
  style?: StyleProp<any>;
}) => {
  const { eventFields } = useEventFields();
  const navigation = useNavigation<StackNavigationProp>();

  const handleCreateNew = useCallback(() => {
    navigation.navigate(createRoute, { key: fieldKey });
  }, [navigation]);

  const handleAddExisting = useCallback(() => {
    navigation.navigate(addRoute, { key: fieldKey });
  }, [navigation]);

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
