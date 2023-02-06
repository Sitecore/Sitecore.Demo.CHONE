import { useCallback, useState } from "react";
import { Image, StatusBar, View } from "react-native";
import { InputText } from "../components/InputText/InputText";
import { inputContainerStyle } from "./CreateEvent/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { Button, Text } from "react-native-paper";
import { Media } from "../interfaces/media";
import { getFileType } from "../helpers/media";
import { generateID } from "../helpers/uuid";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../theme/styles";
import { KeyboardAwareScreen } from "../features/Screen/KeyboardAwareScreen";

const imageStyle = {
  height: 200,
  width: 300,
};

export const EditMediaScreen = ({ navigation, route }) => {
  const [editedImage, setEditedImage] = useState<Partial<Media>>();
  const isEdit: boolean = route.params.editMode;
  const tempMediaKey = route.params.key;

  const onNameChange = useCallback((text: string) => {
    setEditedImage((prev) => ({
      ...prev,
      name: text,
    }));
  }, []);

  const onDescriptionChange = useCallback((text: string) => {
    setEditedImage((prev) => ({
      ...prev,
      description: text,
    }));
  }, []);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAdd = useCallback(() => {
    navigation.navigate(route.params.initialRoute, {
      key: tempMediaKey,
      image: { ...editedImage, id: generateID() },
      isEditMedia: true,
    });
  }, [editedImage, navigation, tempMediaKey]);

  useFocusEffect(
    useCallback(() => {
      setEditedImage(
        route?.params?.image
          ? {
              ...route.params.image,
              description: route.params.image.description || "",
              name: route.params.image.name || "",
              fileHeight: route.params.image.height,
              fileWidth: route.params.image.width,
              fileType: getFileType(route.params.image),
              fileUrl: route.params.image?.fileUrl || route.params.image?.uri,
            }
          : null
      );
    }, [route.params.image])
  );

  if (!editedImage) {
    return <Text>Something went wrong!</Text>;
  }

  return (
    <KeyboardAwareScreen>
      <StatusBar barStyle={"light-content"} />
      <View>
        <Image source={{ uri: editedImage.fileUrl }} style={imageStyle} />
      </View>
      <InputText
        containerStyle={inputContainerStyle}
        label="Name"
        multiline
        onChange={onNameChange}
        value={editedImage?.name || ""}
      />
      <InputText
        containerStyle={inputContainerStyle}
        label="Description"
        multiline
        onChange={onDescriptionChange}
        value={editedImage?.description || ""}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          onPress={onAdd}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >
          {isEdit ? "Edit Media" : "Add Media"}
        </Button>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
