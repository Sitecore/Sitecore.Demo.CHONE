import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { inputContainerStyle } from './CreateEvent/styles';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { InputText } from '../components/InputText/InputText';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { getFileType } from '../helpers/media';
import { generateID } from '../helpers/uuid';
import { useAthleteFields } from '../hooks/useAthleteFields/useAthleteFields';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';

const imageStyle = {
  height: 200,
  width: 300,
};

export const EditMediaScreen = ({ navigation, route }) => {
  const [editedImage, setEditedImage] = useState<Partial<Media>>();
  const { replace: replaceEventFields } = useEventFields();
  const { replace: replaceAthleteFields } = useAthleteFields();
  const contentType = route?.params?.contentType;
  const isEdit: boolean = route?.params?.isEditMode;
  const initialRoute = route?.params?.initialRoute;
  const tempMediaKey = route.params.key;

  const onEdit = useCallback(() => {
    if (contentType === CONTENT_TYPES.EVENT) {
      replaceEventFields({ key: tempMediaKey, value: editedImage });
    } else if (contentType === CONTENT_TYPES.ATHLETE) {
      replaceAthleteFields({ key: tempMediaKey, value: editedImage });
    }
    navigation.navigate(initialRoute, {
      isEditMedia: false,
    });
  }, [
    contentType,
    editedImage,
    initialRoute,
    navigation,
    replaceAthleteFields,
    replaceEventFields,
    tempMediaKey,
  ]);

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
    navigation.navigate(initialRoute, {
      key: tempMediaKey,
      image: { ...editedImage, id: generateID() },
      isEditMedia: true,
    });
  }, [editedImage, initialRoute, navigation, tempMediaKey]);

  useFocusEffect(
    useCallback(() => {
      setEditedImage(
        route?.params?.image
          ? {
              ...route.params.image,
              description: route.params.image.description || '',
              name: route.params.image.name || '',
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
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <View>
        <Image source={{ uri: editedImage.fileUrl }} style={imageStyle} />
      </View>
      <InputText
        containerStyle={inputContainerStyle}
        label="Name"
        multiline
        onChange={onNameChange}
        value={editedImage?.name || ''}
      />
      <InputText
        containerStyle={inputContainerStyle}
        label="Description"
        multiline
        onChange={onDescriptionChange}
        value={editedImage?.description || ''}
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
          onPress={isEdit ? onEdit : onAdd}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >
          {isEdit ? 'Edit Media' : 'Add Media'}
        </Button>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
