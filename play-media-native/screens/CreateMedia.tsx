import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { publishMediaItem } from '../api/queries/mediaItems';
import { uploadSingleImage } from '../api/queries/uploadMedia';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { ITEM_STATUS } from '../constants/itemStatus';
import {
  CREATE_MEDIA_DISCARD_MESSAGE,
  FIELD_OVERRIDES_MEDIA,
  MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT,
} from '../constants/media';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { Screen } from '../features/Screen/Screen';
import { getInitialStateFromOverrides } from '../helpers/contentItemHelper';
import { getFileType } from '../helpers/media';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useMediaQuery } from '../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const CreateMediaScreen = ({ navigation, route }) => {
  const [stateKey] = useState<string>(generateID());
  const { contentItems, init, reset } = useContentItems();
  const media = contentItems[stateKey] as Media;

  const headerTitle = contentItems[stateKey]?.name || 'Untitled media';

  const [createdImage, setCreatedImage] = useState<Media>();
  const [mediaID, setMediaID] = useState(null);
  const [mediaStatus, setMediaStatus] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isMediaItemSaved, setIsMediaItemSaved] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);
  const [showErrorView, setShowErrorView] = useState(false);

  const { refetch: refetchMediaListing } = useMediaQuery(mediaID, mediaStatus);

  const handlePublish = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage({
      ...createdImage,
      ...media,
      stateField: '',
      stateId: '',
      uploadStatus: '',
    })
      .then(async (uploadedImage) => {
        await publishMediaItem(uploadedImage.id)
          .then(async () => {
            setIsMediaItemSaved(true);
            setMediaID(uploadedImage.id);
            setMediaStatus(ITEM_STATUS.PUBLISHED);
            await refetchMediaListing();
            setIsValidating(false);
            setShowSuccessView(true);
            setTimeout(() => {
              navigation.navigate('MainTabs');
            }, MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT);
          })
          .catch(() => {
            setShowErrorView(true);
            setIsValidating(false);
          });
      })
      .catch(() => {
        setShowErrorView(true);
        setIsValidating(false);
      });
  }, [createdImage, media, navigation, refetchMediaListing]);

  const handleSaveDraft = useCallback(async () => {
    setIsValidating(true);

    await uploadSingleImage({
      ...createdImage,
      ...media,
      stateField: '',
      stateId: '',
      uploadStatus: '',
    })
      .then(async () => {
        setIsMediaItemSaved(true);
        await refetchMediaListing();
        setIsValidating(false);
        setShowSuccessView(true);
        setTimeout(() => {
          navigation.navigate('MainTabs');
        }, MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT);
      })
      .catch(() => {
        setShowErrorView(true);
        setIsValidating(false);
      });
  }, [createdImage, media, navigation, refetchMediaListing]);

  useFocusEffect(
    useCallback(() => {
      setCreatedImage(
        route?.params?.image
          ? {
              ...route.params.image,
              fileHeight: route.params.image.height,
              fileWidth: route.params.image.width,
              fileType: getFileType(route.params.image),
              fileUrl: route.params.image?.fileUrl || route.params.image?.uri,
            }
          : null
      );
    }, [route.params.image])
  );

  useEffect(() => {
    // init global state on mount
    //
    if (stateKey) {
      init({
        id: stateKey,
        fields: getInitialStateFromOverrides(FIELD_OVERRIDES_MEDIA),
      });
    }
  }, [init, reset, stateKey]);

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
            stateKey,
          });
        }
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from a nested screen discard action
      //
      return () => {
        unsubscribe();
      };
    }, [headerTitle, isMediaItemSaved, navigation, stateKey])
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
        <NestableScrollContainer>
          <Image
            source={{ uri: createdImage.fileUrl }}
            style={[
              styles.responsiveImage,
              { aspectRatio: createdImage.fileWidth / createdImage.fileHeight },
              { marginBottom: theme.spacing.md },
            ]}
          />
          <ContentItemFields
            initialRoute="CreateEventOverview"
            overrides={FIELD_OVERRIDES_MEDIA}
            stateKey={stateKey}
            headerTitle={headerTitle}
            noRequired
          />
        </NestableScrollContainer>
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
