import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getMediaById } from '../api/queries/getMedia';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

const pageStyles = StyleSheet.create({
  title: {
    fontFamily: theme.fontFamily.bold,
    marginBottom: theme.spacing.xxs,
  },
  body: {
    marginBottom: theme.spacing.sm,
  },
  bottomFAB: {
    position: 'absolute',
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
  button: {
    position: 'absolute',
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export const MediaDetailScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const [error, setError] = useState<unknown>();

  const { data: media, isFetching } = useQuery('mediaItem', () => getMediaById(id), {
    staleTime: 0,
    onError: (error) => {
      setError(error);
    },
  });

  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

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
      <AnimatedFAB
        icon={({ size }) => (
          <FontAwesomeIcon icon={faEdit} color={theme.colors.black.DEFAULT} size={size} />
        )}
        label="Edit"
        extended={isTopEdge}
        onPress={handleEditInfo}
        style={pageStyles.bottomFAB}
      />
    ),
    [isTopEdge, handleEditInfo]
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
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0} style={styles.screenPadding}>
        <Image
          source={{ uri: media.fileUrl }}
          style={[styles.responsiveImage, { aspectRatio: media.fileWidth / media.fileHeight }]}
        />
        <View>
          <Text variant="labelSmall" style={pageStyles.title}>
            Title
          </Text>
          <Text style={pageStyles.body}>{media.name}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Description
          </Text>
          <Text style={pageStyles.body}>{media.description}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Type
          </Text>
          <Text style={pageStyles.body}>{media.fileType}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            State
          </Text>
          <Text style={pageStyles.body}>{media.status}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Size
          </Text>
          <Text style={pageStyles.body}>
            {media.fileWidth}x{media.fileHeight}
          </Text>
        </View>
      </ScrollView>
      {bottomActions}
    </Screen>
  );
};
