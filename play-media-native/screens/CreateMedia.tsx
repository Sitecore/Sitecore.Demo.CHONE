import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { publishMediaItem } from '../api/queries/mediaItems';
import { uploadSingleImage } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { InputText } from '../components/InputText/InputText';
import { ITEM_STATUS } from '../constants/itemStatus';
import {
  CREATE_MEDIA_DISCARD_MESSAGE,
  MEDIA_ERROR_WHILE_UPDATING_TIMEOUT,
  MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT,
} from '../constants/media';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { Screen } from '../features/Screen/Screen';
import { getFileType } from '../helpers/media';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { MediaToUpload } from '../interfaces/media';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const CreateMediaScreen = ({ navigation, route }) => {
  const [createdImage, setCreatedImage] = useState<MediaToUpload>();
  const [mediaID, setMediaID] = useState(null);
  const [mediaStatus, setMediaStatus] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isMediaItemSaved, setIsMediaItemSaved] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);
  const [showErrorView, setShowErrorView] = useState(false);

  const { refetch: refetchMediaListing } = useMediaQuery(mediaID, mediaStatus);

  const headerTitle = createdImage?.name || 'Untitled media';

  const onNameChange = useCallback((text: string) => {
    setCreatedImage((prev) => ({
      ...prev,
      name: text,
    }));
  }, []);

  const onDescriptionChange = useCallback((text: string) => {
    setCreatedImage((prev) => ({
      ...prev,
      description: text,
    }));
  }, []);

  const processSuccess = useCallback(
    async (id = undefined) => {
      setIsMediaItemSaved(true);

      if (id) {
        setMediaID(id);
        setMediaStatus(ITEM_STATUS.PUBLISHED);
      }
      await refetchMediaListing();

      setIsValidating(false);
      setShowSuccessView(true);
      setTimeout(() => {
        navigation.navigate('MainTabs');
      }, MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT);
    },
    [navigation, refetchMediaListing]
  );

  const processError = useCallback(() => {
    setIsValidating(false);
    setShowErrorView(true);
    setTimeout(() => {
      setShowErrorView(false);
    }, MEDIA_ERROR_WHILE_UPDATING_TIMEOUT);
  }, []);

  const handlePublish = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage(createdImage)
      .then(async (uploadedImage) => {
        await publishMediaItem(uploadedImage.id).then(async () => {
          processSuccess(uploadedImage.id);
        });
      })
      .catch(() => {
        processError();
      });
  }, [createdImage, processError, processSuccess]);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage(createdImage)
      .then(async () => {
        processSuccess();
      })
      .catch(() => {
        processError();
      });
  }, [createdImage, processError, processSuccess]);

  useFocusEffect(
    useCallback(() => {
      setCreatedImage((prev) =>
        route?.params?.image
          ? {
              ...route.params.image,
              ...prev,
              fileHeight: route.params.image.height,
              fileWidth: route.params.image.width,
              fileType: getFileType(route.params.image),
              fileUrl: route.params.image?.fileUrl || route.params.image?.uri,
              stateField: '',
              stateId: '',
              uploadStatus: '',
            }
          : null
      );
    }, [route.params.image])
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        if (!isMediaItemSaved) {
          // Prevent default behavior of leaving the screen
          // unless item is saved
          //
          event.preventDefault();

          navigation.push('DiscardChanges', {
            message: CREATE_MEDIA_DISCARD_MESSAGE,
            redirectRoute: 'MainTabs',
            title: headerTitle,
            subtitle: 'Discard new media?',
          });
        }
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [headerTitle, isMediaItemSaved, navigation])
  );

  useEffect(() => {
    navigation.setParams({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  if (!createdImage) {
    return <Text>Something went wrong!</Text>;
  }

  if (isValidating) {
    return (
      <Screen centered>
        <ActivityIndicator size="large" animating />
      </Screen>
    );
  }

  if (showSuccessView) {
    return (
      <Screen centered>
        <Text>Media was successfully created!</Text>
      </Screen>
    );
  }

  if (showErrorView) {
    return (
      <Screen centered>
        <Text>Media could not be created!</Text>
      </Screen>
    );
  }

  return (
    <>
      <KeyboardAwareScreen>
        <Image
          source={{ uri: createdImage.fileUrl }}
          style={[
            styles.responsiveImage,
            { aspectRatio: createdImage.fileWidth / createdImage.fileHeight },
          ]}
        />
        <View style={[styles.screenPadding, { paddingVertical: theme.spacing.sm }]}>
          <InputText
            containerStyle={styles.inputContainer}
            title="Title"
            multiline
            onChange={onNameChange}
            value={createdImage?.name || ''}
          />
          <InputText
            containerStyle={styles.inputContainer}
            title="Description"
            multiline
            onChange={onDescriptionChange}
            value={createdImage?.description || ''}
          />
        </View>
      </KeyboardAwareScreen>
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
    </>
  );
};
