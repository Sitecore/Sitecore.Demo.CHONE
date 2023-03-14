import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate } from '../../helpers/dateHelper';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { Media } from '../../interfaces/media';
import { StackNavigationProp } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CardAvatar } from '../CardAvatar/CardAvatar';
import { CardEvent } from '../CardEvent/CardEvent';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import { RichText } from '../RichText/RichText';

const pageStyles = StyleSheet.create({
  featuredImage: {
    width: '100%',
    height: 500,
  },
  title: {
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xs,
  },
  body: {
    marginBottom: theme.spacing.sm,
  },
});

export const EventDetail = ({ event, isReview }: { event: Event; isReview?: boolean }) => {
  const navigation = useNavigation<StackNavigationProp>();

  const accentColor = useMemo(() => getAccentColor(event?.sport?.title), [event]);

  const imageUriArray = useMemo(() => {
    return event?.relatedMedia.map((img: Media) => img.fileUrl);
  }, [event]);

  const onAthletePress = useCallback(
    (athlete: Athlete) => {
      navigation.navigate('AthleteDetail', {
        id: athlete?.id,
        isEditForbidden: isReview,
        title: athlete?.athleteName,
      });
    },
    [isReview, navigation]
  );

  const onEventPress = useCallback(
    (event: Event) => {
      navigation.navigate('EventDetail', {
        id: event?.id,
        isEditForbidden: isReview,
        title: event?.title,
      });
    },
    [isReview, navigation]
  );

  if (!event) {
    return <Text>Event not available!</Text>;
  }

  return (
    <View>
      {event?.featuredImage?.fileUrl && (
        <View>
          <Image source={{ uri: event?.featuredImage?.fileUrl }} style={pageStyles.featuredImage} />
          <LinearGradient
            colors={[theme.colors.transparent, theme.colors.black.darkest]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />
        </View>
      )}

      <View style={[styles.screenPadding, { marginTop: -100 }]}>
        <CardShadowBox color={accentColor}>
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              {event?.sport?.title && (
                <Text
                  style={{
                    backgroundColor: accentColor,
                    color: getTextColor(accentColor),
                    paddingLeft: theme.spacing.lg,
                    paddingRight: theme.spacing.xxs,
                    marginLeft: -theme.spacing.lg,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  {event.sport.title}
                </Text>
              )}
              {!isReview && (
                <Text style={{ color: theme.colors.gray.DEFAULT }}>{event.status}</Text>
              )}
            </View>
            {(event?.timeAndDate || event?.location) && (
              <Text style={{ color: theme.colors.gray.DEFAULT }}>
                {`${getDate(event?.timeAndDate)} | ${event?.location}`}
              </Text>
            )}
            {event?.title && <Text variant="displaySmall">{event.title}</Text>}
          </Card.Content>
        </CardShadowBox>
      </View>

      <View style={styles.screenPadding}>
        {event?.teaser && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Summary
            </Text>
            <Text style={pageStyles.body}>{event.teaser}</Text>
          </>
        )}
        {event?.body?.content && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Description
            </Text>
            <RichText body={event.body.content} accentColor={accentColor} />
          </>
        )}
      </View>

      {event?.relatedMedia?.length > 0 && (
        <View style={{ marginTop: theme.spacing.lg }}>
          <Text variant="titleMedium" style={[pageStyles.title, { textAlign: 'center' }]}>
            Media
          </Text>
          <ImageGrid images={imageUriArray} />
        </View>
      )}

      {event?.athletes?.length > 0 && (
        <View style={[styles.screenPadding, { marginTop: theme.spacing.lg }]}>
          <Text variant="titleMedium" style={[pageStyles.title, { textAlign: 'center' }]}>
            Athletes
          </Text>
          {event.athletes.map((athlete: Athlete) => (
            <CardAvatar
              key={athlete.id}
              item={athlete}
              onCardPress={() => onAthletePress(athlete)}
            />
          ))}
        </View>
      )}

      {event?.similarEvents?.length > 0 && (
        <View style={{ marginTop: theme.spacing.sm }}>
          <Text variant="titleMedium" style={[pageStyles.title, { textAlign: 'center' }]}>
            Related events
          </Text>
          {event.similarEvents.map((event: Event) => (
            <CardEvent key={event.id} item={event} onCardPress={() => onEventPress(event)} />
          ))}
        </View>
      )}
    </View>
  );
};
