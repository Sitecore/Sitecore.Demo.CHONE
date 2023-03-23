import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getMediaById } from '../api/queries/getMedia';
import { BottomFAB } from '../components/BottomFAB/BottomFAB';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { MediaDetail } from '../features/MediaDetail/MediaDetail';
import { Screen } from '../features/Screen/Screen';
import { RootStackParamList } from '../interfaces/navigators';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'MediaDetail'>;

export const MediaDetailScreen = ({ route, navigation }: Props) => {
  const id = route?.params?.id;

  const {
    data: media,
    error,
    isFetching,
  } = useQuery('mediaItem', () => getMediaById(id), {
    staleTime: 0,
  });

  useEffect(() => {
    navigation.setOptions({
      title: media?.name,
    });
  }, [media, navigation]);

  const handleEditInfo = useCallback(() => {
    // TODO
  }, []);

  const bottomActions = useMemo(
    () => (
      <BottomFAB
        icon={({ size }) => (
          <FontAwesomeIcon icon={faEdit} color={theme.colors.black.DEFAULT} size={size} />
        )}
        label="Edit"
        onPress={handleEditInfo}
      />
    ),
    [handleEditInfo]
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
      <ScrollView>
        <MediaDetail media={media} />
      </ScrollView>
      {bottomActions}
    </Screen>
  );
};
