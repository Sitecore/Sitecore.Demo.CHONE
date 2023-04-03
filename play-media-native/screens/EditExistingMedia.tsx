import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
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

  const { error, isFetching } = useQuery(`media-${id}`, () => getMediaById(id), {
    staleTime: 0,
    onSuccess: (data) => setEditedMedia(data),
  });

  const headerTitle = useMemo(
    () => (editedMedia?.name ? removeFileExtension(editedMedia.name) : 'Untitled media'),
    [editedMedia?.name]
  );

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({
        title: headerTitle,
      });
    }, [headerTitle, navigation])
  );

  const handleNameChange = useCallback((text: string) => {
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
          onChange={handleNameChange}
          value={editedMedia?.name ? removeFileExtension(editedMedia.name) : ''}
        />
        <InputText
          containerStyle={styles.inputContainer}
          title="Description"
          multiline
          onChange={handleDescriptionChange}
          value={editedMedia?.description || ''}
        />
      </View>
    </KeyboardAwareScreen>
  );
};
