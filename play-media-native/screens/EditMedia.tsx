import { useCallback, useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { theme } from "../theme/theme";
import { InputText } from "../components/InputText/InputText";
import { inputContainerStyle } from "./CreateEvent/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useMedia } from "../hooks/useMedia/useMedia";
import { Button, Text } from "react-native-paper";
import { Media } from "../interfaces/media";
import { getFileType } from "../helpers/media";
import { generateID } from "../helpers/uuid";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../theme/styles";

const imageStyle = {
  height: 200,
  width: 300,
};

const buttonStyle = {
  borderWidth: 1,
  borderColor: theme.colors.yellow.DEFAULT,
  marginHorizontal: theme.spacing.xs,
};

const labelStyle = {
  fontFamily: theme.fontFamily.medium,
  fontSize: theme.fontSize.base,
  lineHeight: 30,
};

export const EditMediaScreen = ({ navigation, route }) => {
  const { add, edit } = useMedia();
  const [editedImage, setEditedImage] = useState<Partial<Media>>();
  const isEdit: boolean = route.params.editMode;

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
    if (isEdit) {
      edit(editedImage as Media);
    } else {
      add([{ ...editedImage, id: generateID() } as Media]);
    }
    navigation.goBack();
  }, [add, edit, editedImage, isEdit, navigation]);

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
    <SafeAreaView
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.black.darkest,
      }}
    >
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
          // labelStyle={styles.buttonLabel}
          // style={styles.button}
        >
          {isEdit ? "Edit Media" : "Add Media"}
        </Button>
      </BottomActions>
    </SafeAreaView>
  );
};