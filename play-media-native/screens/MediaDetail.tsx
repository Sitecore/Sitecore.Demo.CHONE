import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getMediaById } from '../api/queries/getMedia';
import { AnimatedButton } from '../components/AnimatedButton/AnimatedButton';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaDetail } from '../features/MediaDetail/MediaDetail';
import { Screen } from '../features/Screen/Screen';
import { removeFileExtension } from '../helpers/media';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MediaDetail'>;

export const MediaDetailScreen = ({ route, navigation }: Props) => {
  const id = route?.params?.id;

  const {
    data: media,
    error,
    isFetching,
  } = useQuery(`media-${id}`, () => getMediaById(id), {
    staleTime: 0,
  });

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({
        title: media?.name ? removeFileExtension(media.name) : 'Untitled media',
      });
    }, [media?.name, navigation])
  );

  const handleEditInfo = useCallback(() => {
    navigation.push('EditExistingMedia', { id });
  }, [id, navigation]);

  const bottomActions = useMemo(
    () => (
      <AnimatedButton
        extended={isTopEdge}
        iconName="square-edit-outline"
        label="Edit"
        onPress={handleEditInfo}
        style={styles.fab}
      />
    ),
    [handleEditInfo, isTopEdge]
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!media || error) {
    return (
      <Screen centered>
        <Text>Media not available!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0}>
        <MediaDetail media={media} />
      </ScrollView>
      {bottomActions}
    </Screen>
  );
};
