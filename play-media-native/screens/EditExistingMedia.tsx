import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getMediaById } from '../api/queries/getMedia';
import { InputText } from '../components/InputText/InputText';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { Screen } from '../features/Screen/Screen';
import { removeFileExtension } from '../helpers/media';
import { Media } from '../interfaces/media';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EditExistingMedia'>;

export const EditExistingMediaScreen = ({ navigation, route }: Props) => {
  const id = route?.params?.id;

  const [editedMedia, setEditedMedia] = useState<Partial<Media>>();
  const [isMediaItemSaved, setIsMediaItemSaved] = useState(false);

  const { error, isFetching } = useQuery(`media-${id}`, () => getMediaById(id), {
    staleTime: 0,
    onSuccess: (data) => setEditedMedia(data),
  });

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

  const bottomActions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleSaveDraft}
        >
          Save as Draft
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

  return (
    <KeyboardAwareScreen>
      <Image
        source={{ uri: editedMedia?.fileUrl }}
        style={[
          styles.responsiveImage,
          { aspectRatio: editedMedia?.fileWidth / editedMedia?.fileHeight },
        ]}
      />
      <View style={[styles.screenPadding, { paddingVertical: theme.spacing.sm }]}>
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
      {bottomActions}
    </KeyboardAwareScreen>
  );
};
