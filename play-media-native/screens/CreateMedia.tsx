import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { publishMediaItem } from '../api/queries/mediaItems';
import { uploadSingleImage } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { InputText } from '../components/InputText/InputText';
import { Toast } from '../components/Toast/Toast';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { getFileType } from '../helpers/media';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const CreateMediaScreen = ({ navigation, route }) => {
  const [editedImage, setEditedImage] = useState<Media>();

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  const { refetch: refetchMediaListing } = useMediaQuery();

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

  const handlePublish = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage({ ...editedImage, stateField: '', stateId: '', uploadStatus: '' })
      .then(async (uploadedImage) => {
        await publishMediaItem(uploadedImage.id)
          .then(async () => {
            setShowSuccessToast(true);
            await refetchMediaListing();
            setIsValidating(false);
            navigation.navigate('MainTabs');
          })
          .catch(() => {
            setShowErrorToast(true);
            setIsValidating(false);
          });
      })
      .catch(() => {
        setShowErrorToast(true);
        setIsValidating(false);
      });
  }, [editedImage, navigation, refetchMediaListing]);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage({ ...editedImage, stateField: '', stateId: '', uploadStatus: '' })
      .then(async () => {
        setShowSuccessToast(true);
        await refetchMediaListing();
        setIsValidating(false);
        navigation.navigate('MainTabs');
      })
      .catch(() => {
        setShowErrorToast(true);
        setIsValidating(false);
      });
  }, [editedImage, navigation, refetchMediaListing]);

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

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        // Prevent default behavior of leaving the screen
        //
        event.preventDefault();

        navigation.push('DiscardChanges', {
          message: 'Are you sure you want to discard the new media item or continue editing?',
          redirectRoute: 'MainTabs',
          subtitle: 'Discard new media?',
        });
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [navigation])
  );

  // Hide bottom action buttons if a loading indicator or a toaster is shown
  useEffect(() => {
    if (isValidating || showSuccessToast || showErrorToast) {
      setShouldShowBottomActions(false);
    } else {
      setShouldShowBottomActions(true);
    }
  }, [isValidating, showSuccessToast, showErrorToast]);

  useEffect(() => {
    navigation.setParams({
      title: editedImage?.name || 'Untitled media',
    });
  }, [editedImage, navigation]);

  const bottomActions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={handleSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={handlePublish}
        >
          Publish
        </Button>
      </BottomActions>
    ),
    [handlePublish, handleSaveDraft]
  );

  if (!editedImage) {
    return <Text>Something went wrong!</Text>;
  }

  return (
    <KeyboardAwareScreen>
      <Image
        source={{ uri: editedImage.fileUrl }}
        style={[
          styles.responsiveImage,
          { aspectRatio: editedImage.fileWidth / editedImage.fileHeight },
        ]}
      />
      <View style={[styles.screenPadding, { paddingVertical: theme.spacing.sm }]}>
        <InputText
          containerStyle={styles.inputContainer}
          title="Title"
          multiline
          onChange={onNameChange}
          value={editedImage?.name || ''}
        />
        <InputText
          containerStyle={styles.inputContainer}
          title="Description"
          multiline
          onChange={onDescriptionChange}
          value={editedImage?.description || ''}
        />
      </View>
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message="Media created successfully!"
        onDismiss={() => setShowSuccessToast(false)}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message="Media could not be created"
        onDismiss={() => setShowErrorToast(false)}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </KeyboardAwareScreen>
  );
};
