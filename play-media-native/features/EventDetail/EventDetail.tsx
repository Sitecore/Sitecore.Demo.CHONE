import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getAccentColor } from '../../helpers/colorHelper';
import { getDate, getTime } from '../../helpers/dateHelper';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { Media } from '../../interfaces/media';
import { StackNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';
import { CardAvatar } from '../CardAvatar/CardAvatar';
import { CardEvent } from '../CardEvent/CardEvent';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import { RichText } from '../RichText/RichText';

const pageStyles = StyleSheet.create({
  featuredImage: {
    height: 300,
    width: '100%',
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
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
        <View style={{ marginBottom: theme.spacing.sm }}>
          <Image source={{ uri: event?.featuredImage?.fileUrl }} style={pageStyles.featuredImage} />
        </View>
      )}
      {event?.sport?.title && (
        <View>
          <Text variant="labelSmall" style={pageStyles.title}>
            Sport
          </Text>
          <Text
            style={[
              pageStyles.body,
              {
                color: accentColor,
              },
            ]}
          >
            {event.sport.title || ''}
          </Text>
        </View>
      )}
      <View>
        {event?.title && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Title
            </Text>
            <Text style={pageStyles.body}>{event.title}</Text>
          </>
        )}
        {event?.timeAndDate && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Time and date
            </Text>
            <Text style={pageStyles.body}>
              {getDate(event.timeAndDate)} {getTime(event.timeAndDate)}
            </Text>
          </>
        )}
        {event?.teaser && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Teaser
            </Text>
            <Text style={pageStyles.body}>{event.teaser}</Text>
          </>
        )}
        {event?.location && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Location
            </Text>
            <Text style={pageStyles.body}>{event.location}</Text>
          </>
        )}
        {event?.body?.content && (
          <>
            <Text variant="labelSmall" style={pageStyles.title}>
              Body
            </Text>
            <RichText body={event.body.content} accentColor={accentColor} />
          </>
        )}
      </View>
      <ImageGrid images={imageUriArray} style={{ marginTop: theme.spacing.lg }} />
      {event?.athletes?.length > 0 && (
        <View style={{ marginTop: theme.spacing.lg }}>
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
        <View style={{ marginTop: theme.spacing.lg }}>
          {event.similarEvents.map((event: Event) => (
            <CardEvent key={event.id} item={event} onCardPress={() => onEventPress(event)} />
          ))}
        </View>
      )}
    </View>
  );
};
