import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate, getYear } from '../../helpers/dateHelper';
import { Athlete } from '../../interfaces/athlete';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';
import { AthleteImages } from '../Screens/AthleteImages';

const pageStyles = StyleSheet.create({
  sportAndNameContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray.dark,
    marginBottom: theme.spacing.xxs,
  },
  item: {
    marginBottom: theme.spacing.sm,
  },
  cardContainer: {
    marginVertical: theme.spacing.xs,
  },
  quoteContainer: {
    display: 'flex',
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
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.black.light,
    paddingTop: theme.spacing.sm,
  },
  infoLabel: {
    color: theme.colors.gray.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.xxs,
  },
  infoItem: {
    color: theme.colors.white.DEFAULT,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontFamily: theme.fontFamily.bold,
  },
});

const ShadowBoxField = ({ title, value }: { title: string; value: string }) => {
  if (!value) {
    return null;
  }

  return (
    <>
      <Text style={pageStyles.infoLabel}>{title}</Text>
      <Text style={pageStyles.infoItem}>{value}</Text>
    </>
  );
};

export const AthleteDetail = ({ athlete, isReview }: { athlete: Athlete; isReview?: boolean }) => {
  const accentColor =
    getAccentColor(athlete?.sport?.results[0]?.title) || theme.colors.gray.DEFAULT;
  const textColor = getTextColor(accentColor) || theme.colors.white.DEFAULT;

  const showShadowBox =
    athlete?.nationality || athlete?.hobby || athlete?.dateOfBirth || athlete?.careerStartDate;

  if (!athlete) {
    return <Text>Event not available!</Text>;
  }

  return (
    <View>
      <View style={pageStyles.sportAndNameContainer}>
        {athlete?.sport?.results[0]?.title && (
          <View style={{ marginRight: theme.spacing.xl }}>
            <Text style={[pageStyles.label, { paddingHorizontal: theme.spacing.sm }]}>Sport</Text>
            <Text
              style={[
                pageStyles.item,
                {
                  backgroundColor: accentColor,
                  color: textColor,
                  paddingHorizontal: theme.spacing.sm,
                },
              ]}
            >
              {athlete.sport.results[0].title}
            </Text>
          </View>
        )}
        {athlete?.athleteName && (
          <View>
            <Text style={pageStyles.label}>Athlete name</Text>
            <Text
              style={[
                pageStyles.item,
                {
                  color: theme.colors.white.DEFAULT,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              {athlete.athleteName}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.screenPadding}>
        {athlete?.athleteQuote && (
          <View style={pageStyles.cardContainer}>
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
          <View style={pageStyles.cardContainer}>
            <CardShadowBox color={accentColor}>
              <View style={pageStyles.infoContainer}>
                <ShadowBoxField title="Nationality" value={athlete?.nationality} />
                <ShadowBoxField title="Hobby" value={athlete?.hobby} />
                <ShadowBoxField title="Date of birth" value={getDate(athlete?.dateOfBirth)} />
                <ShadowBoxField title="Career start" value={getYear(athlete?.careerStartDate)} />
              </View>
            </CardShadowBox>
          </View>
        )}
        {athlete?.relatedMedia?.results?.length && <AthleteImages athlete={athlete} />}
      </View>
    </View>
  );
};
