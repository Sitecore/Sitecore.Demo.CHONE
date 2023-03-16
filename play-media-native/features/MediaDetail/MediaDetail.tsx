import { Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { CardShadowBox } from '../../features/CardShadowBox/CardShadowBox';
import { removeFileExtension } from '../../helpers/media';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const pageStyles = StyleSheet.create({
  image: {
    marginBottom: theme.spacing.xs,
  },
  title: {
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
    marginRight: theme.spacing.xs,
  },
  body: {
    marginBottom: theme.spacing.sm,
  },
  shadowBoxField: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
});

export const MediaDetail = ({ media }: { media: Media }) => {
  return (
    <>
      <Image
        source={{ uri: media.fileUrl }}
        style={[
          styles.responsiveImage,
          { aspectRatio: media.fileWidth / media.fileHeight },
          pageStyles.image,
        ]}
      />
      <View style={styles.screenPadding}>
        <Text variant="labelSmall" style={pageStyles.title}>
          Title
        </Text>
        <Text style={pageStyles.body}>{removeFileExtension(media.name)}</Text>
        <Text variant="labelSmall" style={pageStyles.title}>
          Description
        </Text>
        <Text style={pageStyles.body}>{media.description}</Text>

        <CardShadowBox color={theme.colors.black.lightest}>
          <Card.Content>
            <View style={pageStyles.shadowBoxField}>
              <Text variant="labelSmall" style={pageStyles.title}>
                Type
              </Text>
              <Text>{media.fileType}</Text>
            </View>

            <View style={pageStyles.shadowBoxField}>
              <Text variant="labelSmall" style={pageStyles.title}>
                State
              </Text>
              <Text>{media.status}</Text>
            </View>

            <View style={[pageStyles.shadowBoxField, { marginBottom: 0 }]}>
              <Text variant="labelSmall" style={pageStyles.title}>
                Size
              </Text>
              <Text>
                {media.fileWidth}x{media.fileHeight}
              </Text>
            </View>
          </Card.Content>
        </CardShadowBox>
      </View>
    </>
  );
};
