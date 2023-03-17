import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { InputText } from '../components/InputText/InputText';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { getFileType } from '../helpers/media';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';

const imageStyle = {
  height: 200,
  width: 300,
};

export const EditMediaScreen = ({ navigation, route }) => {
  const [editedImage, setEditedImage] = useState<Partial<Media>>();
  const { contentItems, edit, replace } = useContentItems();

  // route params
  //
  const fieldKey = route?.params?.key;
  const isEdit: boolean = route?.params?.isEditMode;
  const initialRoute = route?.params?.initialRoute;
  const single = route?.params?.single;
  const stateKey = route?.params?.stateKey;
  const headerTitle = route?.params?.title;

  const onEdit = useCallback(() => {
    replace({ id: stateKey, key: fieldKey, value: editedImage });

    navigation.navigate(initialRoute, { title: headerTitle });
  }, [editedImage, fieldKey, initialRoute, navigation, replace, stateKey, headerTitle]);

  const onAdd = useCallback(() => {
    edit(
      single
        ? { id: stateKey, key: fieldKey, value: { ...editedImage, id: generateID() } }
        : {
            id: stateKey,
            key: fieldKey,
            value: [...contentItems[stateKey][fieldKey], { ...editedImage, id: generateID() }],
          }
    );

    navigation.navigate(initialRoute, { title: headerTitle });
  }, [
    contentItems,
    edit,
    editedImage,
    fieldKey,
    initialRoute,
    navigation,
    single,
    stateKey,
    headerTitle,
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
        containerStyle={styles.inputContainer}
        label="Name"
        multiline
        onChange={onNameChange}
        value={editedImage?.name || ''}
      />
      <InputText
        containerStyle={styles.inputContainer}
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
