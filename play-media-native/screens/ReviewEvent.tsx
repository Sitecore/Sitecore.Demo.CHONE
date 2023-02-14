import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { ImageGrid } from '../features/ImageGrid/ImageGrid';
import { RichText } from '../features/RichText/RichText';
import { Screen } from '../features/Screen/Screen';
import { getAccentColor } from '../helpers/colorHelper';
import { getDate, getTime } from '../helpers/dateHelper';
import { Athlete } from '../interfaces/athlete';
import { Event } from '../interfaces/event';
import { Media } from '../interfaces/media';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

const pageStyles = StyleSheet.create({
  title: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
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

export const ReviewEventScreen = ({ navigation, route }) => {
  const event = route?.params?.event as Event;

  useEffect(() => {
    navigation.setOptions({
      title: `Review ${event.title}`,
    });
  }, [event, navigation]);

  // const onCardPress = useCallback(
  //   (athlete: Athlete) => {
  //     navigation.navigate('AthleteDetail', {
  //       id: athlete.id,
  //       title: athlete.athleteName,
  //     });
  //   },
  //   [navigation]
  // );

  const handleDraft = useCallback(() => {
    // TODO draft case
  }, []);

  // TODO Add API request to create/ update athlete
  const handlePublishBtn = useCallback(() => {}, []);

  const accentColor = useMemo(() => getAccentColor(event?.sport?.title), [event]);

  const imageUriArray = useMemo(() => {
    return event.relatedMedia.map((img: Media) => img.fileUrl);
  }, [event]);

  const bottomActions = useMemo(
    () => (
      <BottomActions style={pageStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDraft}
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
    [handleDraft, handlePublishBtn]
  );

  console.log('\n\n\n\n\nevent Review Event', event);
  console.log('\n\n\n\n\n');

  if (!event) {
    return (
      <Screen centered>
        <Text>Event not available!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView scrollEventThrottle={0} style={styles.screenPadding}>
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
        <View>
          <Text variant="labelSmall" style={pageStyles.title}>
            Title
          </Text>
          <Text style={pageStyles.body}>{event.title}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Time and date
          </Text>
          <Text style={pageStyles.body}>
            {getDate(event.timeAndDate)} {getTime(event.timeAndDate)}
          </Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Summary
          </Text>
          <Text style={pageStyles.body}>{event.teaser}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Location
          </Text>
          <Text style={pageStyles.body}>{event.location}</Text>
          <Text variant="labelSmall" style={pageStyles.title}>
            Body
          </Text>
          <RichText body={event.body.content} accentColor={accentColor} />
        </View>
        <ImageGrid images={imageUriArray} style={{ marginTop: theme.spacing.lg }} />
        <View style={{ marginTop: theme.spacing.lg }}>
          {event.athletes.map((athlete: Athlete) => (
            <CardAvatar key={athlete.id} item={athlete} />
          ))}
        </View>
        <View style={{ marginTop: theme.spacing.lg }}>
          {event.similarEvents.map((event: Event) => (
            <CardEvent key={event.id} item={event} />
          ))}
        </View>
        <View style={{ paddingBottom: 70 }} />
      </ScrollView>
      {bottomActions}
    </Screen>
  );
};
