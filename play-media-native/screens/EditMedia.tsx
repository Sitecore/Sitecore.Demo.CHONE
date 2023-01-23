import { useCallback } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { theme } from "../theme/theme";
import { InputText } from "../components/InputText/InputText";
import { inputContainerStyle } from "./CreateEvent/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { useMedia } from "../hooks/useMedia/useMedia";
import { Button } from "react-native-paper";
import { Media } from "../interfaces/media";

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
  const { temp, add, editTemp, clearTemp } = useMedia();
  const params = route.params;

  const onNameChange = useCallback((text: string) => {
    editTemp({ fileName: text });
  }, []);

  const onDescriptionChange = useCallback((text: string) => {
    editTemp({ description: text });
  }, []);

  const onCancel = useCallback(() => {
    clearTemp();
    navigation.goBack();
  }, [clearTemp, navigation]);

  const onAdd = useCallback(() => {
    add([temp] as Media[]);
    clearTemp();
    navigation.goBack();
  }, [add, clearTemp, navigation, temp]);

  console.log("params", params);

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
        <Image source={{ uri: temp.fileUrl }} style={imageStyle} />
      </View>
      <InputText
        containerStyle={inputContainerStyle}
        label="Name"
        multiline
        onChange={onNameChange}
        value={temp?.fileName || ""}
      />
      <InputText
        containerStyle={inputContainerStyle}
        label="Description"
        multiline
        onChange={onDescriptionChange}
        value={temp?.description || ""}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onAdd}
        >
          Add Media
        </Button>
      </BottomActions>
    </SafeAreaView>
  );
};
