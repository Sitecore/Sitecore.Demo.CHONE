import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { AvatarImage } from '../../components/AvatarImage/AvatarImage';
import { ATHLETE_MOCK_IMG, EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate, getYear } from '../../helpers/dateHelper';
import { useEventsQuery } from '../../hooks/useEventsQuery/useEventsQuery';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { StackNavigationProp } from '../../interfaces/navigators';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CardEvent } from '../CardEvent/CardEvent';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';
import { ImageGrid } from '../ImageGrid/ImageGrid';

const pageStyles = StyleSheet.create({
  featuredImage: {
    width: '100%',
    height: 350,
  },
  title: {
    color: theme.colors.gray.dark,
    marginRight: theme.spacing.xs,
  },
  titleLarge: {
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  sectionContainer: {
    marginVertical: theme.spacing.xs,
  },
  shadowBoxField: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  shadowBoxInfoContainer: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  quoteContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xs,
  },
  quotationMark: {
    fontSize: 80,
    fontFamily: theme.fontFamily.italic,
    textAlign: 'center',
    lineHeight: 100,
    flexBasis: '15%',
  },
  quote: {
    fontSize: theme.fontSize.lg,
    lineHeight: theme.spacing.lg,
    fontFamily: theme.fontFamily.italic,
    flexBasis: '70%',
    paddingVertical: theme.spacing.lg,
    textAlign: 'center',
  },
});

const ShadowBoxField = ({ title, value }: { title: string; value: string }) => {
  if (!value) {
    return null;
  }

  return (
    <View style={pageStyles.shadowBoxField}>
      <Text variant="labelSmall" style={pageStyles.title}>
        {title}
      </Text>
      <Text>{value}</Text>
    </View>
  );
};

export const AthleteDetail = ({ athlete, isReview }: { athlete: Athlete; isReview?: boolean }) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { data: events } = useEventsQuery();

  const accentColor = getAccentColor(athlete?.sport?.title) || theme.colors.gray.DEFAULT;
  const textColor = getTextColor(accentColor) || theme.colors.white.DEFAULT;

  const showShadowBox =
    athlete?.nationality || athlete?.hobby || athlete?.dateOfBirth || athlete?.careerStartDate;

  const athleteEvents = useMemo(() => {
    const athleteEvents = !events
      ? []
      : events.filter((event: Event) =>
          event?.athletes?.map((athlete: Athlete) => athlete.id).includes(athlete.id)
        );

    return athleteEvents as Event[];
  }, [athlete.id, events]);

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

  if (!athlete) {
    return <Text>Athlete not available!</Text>;
  }

  return (
    <View style={{ paddingBottom: isReview ? 50 : 0 }}>
      <View>
        <Image
          source={{ uri: athlete?.featuredImage?.fileUrl || EVENT_MOCK_IMG }}
          style={pageStyles.featuredImage}
        />
        <LinearGradient
          colors={[theme.colors.transparent, theme.colors.black.darkest]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.overlay}
        />
        {athlete?.profilePhoto?.fileUrl && (
          <View
            style={{
              position: 'absolute',
              left: '50%',
              top: 50,
              transform: [{ translateX: -75 }],
            }}
          >
            <AvatarImage
              size={150}
              uri={athlete?.profilePhoto?.fileUrl || ATHLETE_MOCK_IMG}
              color={accentColor}
            />
          </View>
        )}
      </View>

      <View style={[styles.screenPadding, { marginTop: -100 }]}>
        <CardShadowBox color={accentColor}>
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              {athlete?.sport?.title && (
                <Text
                  style={{
                    backgroundColor: accentColor,
                    color: textColor,
                    paddingLeft: theme.spacing.lg,
                    paddingRight: theme.spacing.xxs,
                    marginLeft: -theme.spacing.lg,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  {athlete.sport.title}
                </Text>
              )}
              {!isReview && (
                <Text style={{ color: theme.colors.gray.DEFAULT }}>{athlete.status}</Text>
              )}
            </View>
            {athlete?.athleteName && <Text variant="displaySmall">{athlete.athleteName}</Text>}
          </Card.Content>
        </CardShadowBox>
      </View>

      <View style={styles.screenPadding}>
        {athlete?.athleteQuote && (
          <View style={pageStyles.sectionContainer}>
            <CardShadowBox color={theme.colors.black.light}>
              <View
                style={[
                  pageStyles.quoteContainer,
                  {
                    backgroundColor: accentColor,
                  },
                ]}
              >
                <Text style={[pageStyles.quotationMark, { color: textColor }]}>"</Text>
                <Text style={[pageStyles.quote, { color: textColor }]}>{athlete.athleteQuote}</Text>
                <Text style={[pageStyles.quotationMark, { color: textColor }]}>"</Text>
              </View>
            </CardShadowBox>
          </View>
        )}

        {showShadowBox && (
          <CardShadowBox color={accentColor}>
            <View style={pageStyles.shadowBoxInfoContainer}>
              <ShadowBoxField title="Nationality" value={athlete?.nationality} />
              <ShadowBoxField title="Hobby" value={athlete?.hobby} />
              <ShadowBoxField title="Date of birth" value={getDate(athlete?.dateOfBirth)} />
              <ShadowBoxField title="Career start" value={getYear(athlete?.careerStartDate)} />
            </View>
          </CardShadowBox>
        )}
      </View>

      {athlete?.relatedMedia?.length > 0 && (
        <View style={pageStyles.sectionContainer}>
          <Text variant="titleMedium" style={pageStyles.titleLarge}>
            Related media
          </Text>
          <ImageGrid images={athlete.relatedMedia.map((img) => img.fileUrl)} />
        </View>
      )}

      {athleteEvents?.length > 0 && (
        <View style={pageStyles.sectionContainer}>
          <Text variant="titleMedium" style={pageStyles.titleLarge}>
            Related events
          </Text>
          {athleteEvents.map((event: Event) => (
            <CardEvent key={event.id} item={event} onCardPress={() => onEventPress(event)} />
          ))}
        </View>
      )}
    </View>
  );
};
