import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getMediaById } from '../api/queries/getMedia';
import { publishMediaItem, updateMediaItem } from '../api/queries/mediaItems';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { InputText } from '../components/InputText/InputText';
import { ITEM_STATUS } from '../constants/itemStatus';
import {
  MEDIA_ERROR_WHILE_UPDATING_TIMEOUT,
  MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT,
} from '../constants/media';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { Screen } from '../features/Screen/Screen';
import { removeFileExtension } from '../helpers/media';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../interfaces/media';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EditExistingMedia'>;

export const EditExistingMediaScreen = ({ navigation, route }: Props) => {
  const id = route?.params?.id;

  const [editedMedia, setEditedMedia] = useState<Partial<Media>>();
  const [isMediaItemSaved, setIsMediaItemSaved] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [shouldShowSuccessView, setShouldShowSuccessView] = useState(false);
  const [shouldShowErrorView, setShouldShowErrorView] = useState(false);

  const { error, isFetching } = useQuery(`media-${id}`, () => getMediaById(id), {
    staleTime: 0,
    onSuccess: (data) => setEditedMedia(data),
  });

  // In case of publishing we have to manually update the media item's status
  // because the server takes too long to reflect the change
  const [mediaID, setMediaID] = useState(null);
  const [mediaStatus, setMediaStatus] = useState(null);
  const { refetch: refetchMediaListing } = useMediaQuery(mediaID, mediaStatus);

  const headerTitle = useMemo(
    () => (editedMedia?.name ? removeFileExtension(editedMedia.name) : 'Untitled media'),
    [editedMedia?.name]
  );
  const editedMediaTitle = useMemo(
    () => (editedMedia?.name ? removeFileExtension(editedMedia.name) : ''),
    [editedMedia?.name]
  );

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({
        title: headerTitle,
      });
    }, [headerTitle, navigation])
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        if (!isMediaItemSaved) {
          event.preventDefault();

          navigation.push('DiscardChanges', {
            id: editedMedia?.id,
            title: headerTitle,
            subtitle: 'Discard media file changes?',
            message: 'Are you sure you want to discard the media file changes?',
            redirectRoute: 'MediaDetail',
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }, [navigation, isMediaItemSaved, editedMedia?.id, headerTitle])
  );

  const handleTitleChange = useCallback((text: string) => {
    setEditedMedia((media) => ({
      ...media,
      name: text,
    }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setEditedMedia((media) => ({
      ...media,
      description: text,
    }));
  }, []);

  const processSuccess = useCallback(
    async (id = undefined, status = undefined) => {
      setIsMediaItemSaved(true);
      setIsValidating(false);
      setShouldShowSuccessView(true);

      if (id && status) {
        setMediaID(id);
        setMediaStatus(status);
      }

      await refetchMediaListing();
      setTimeout(() => {
        navigation.navigate('MainTabs');
      }, MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT);
    },
    [navigation, refetchMediaListing]
  );

  const processError = useCallback(() => {
    setIsValidating(false);
    setShouldShowErrorView(true);
    setTimeout(() => {
      setShouldShowErrorView(false);
    }, MEDIA_ERROR_WHILE_UPDATING_TIMEOUT);
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    await updateMediaItem(editedMedia)
      .then(() => {
        processSuccess();
      })
      .catch(() => {
        processError();
      });
  }, [editedMedia, processError, processSuccess]);

  const handlePublishBtn = useCallback(async () => {
    setIsValidating(true);

    await updateMediaItem(editedMedia)
      .then(async () => {
        await publishMediaItem(editedMedia.id).then(async () => {
          setIsPublished(true);
          processSuccess(editedMedia.id, ITEM_STATUS.PUBLISHED);
        });
      })
      .catch(() => {
        processError();
      });
  }, [editedMedia, processError, processSuccess]);

  const bottomActions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handlePublishBtn}
        >
          Publish
        </Button>
      </BottomActions>
    ),
    [handleSaveDraft, handlePublishBtn]
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!editedMedia || error) {
    return (
      <Screen centered>
        <Text>Media not available!</Text>
      </Screen>
    );
  }

  if (isValidating) {
    return (
      <Screen centered>
        <ActivityIndicator size="large" animating />
      </Screen>
    );
  }

  if (shouldShowSuccessView) {
    return (
      <Screen centered>
        <Text>{`Media was successfully ${isPublished ? 'published' : 'saved as draft'}!`}</Text>
      </Screen>
    );
  }

  if (shouldShowErrorView) {
    return (
      <Screen centered>
        <Text>There was an error while trying to update the media item!</Text>
      </Screen>
    );
  }

  return (
    <>
      <KeyboardAwareScreen>
        <NestableScrollContainer>
          <Image
            source={{ uri: editedMedia?.fileUrl }}
            style={[
              styles.responsiveImage,
              { aspectRatio: editedMedia?.fileWidth / editedMedia?.fileHeight },
            ]}
          />
          <View
            style={[
              styles.screenPadding,
              { paddingVertical: theme.spacing.sm, marginBottom: theme.spacing.lg },
            ]}
          >
            <InputText
              containerStyle={styles.inputContainer}
              title="Title"
              multiline
              onChange={handleTitleChange}
              value={editedMediaTitle}
            />
            <InputText
              containerStyle={styles.inputContainer}
              title="Description"
              multiline
              onChange={handleDescriptionChange}
              value={editedMedia?.description || ''}
            />
          </View>
        </NestableScrollContainer>
      </KeyboardAwareScreen>
      {bottomActions}
    </>
  );
};
