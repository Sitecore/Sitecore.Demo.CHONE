import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate, getYear } from '../../helpers/dateHelper';
import { Athlete } from '../../interfaces/athlete';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';
import { ImageGrid } from '../ImageGrid/ImageGrid';

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
  imageContainer: {
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  imageLabel: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  imageItem: {
    height: 300,
    width: '100%',
    marginTop: theme.spacing.xs,
  },
  imageGrid: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  imageBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.sm,
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

export const AthleteDetail = ({ athlete }: { athlete: Athlete; isReview?: boolean }) => {
  const accentColor = getAccentColor(athlete?.sport?.title) || theme.colors.gray.DEFAULT;
  const textColor = getTextColor(accentColor) || theme.colors.white.DEFAULT;

  const showShadowBox =
    athlete?.nationality || athlete?.hobby || athlete?.dateOfBirth || athlete?.careerStartDate;

  if (!athlete) {
    return <Text>Athlete not available!</Text>;
  }

  return (
    <View>
      <View style={pageStyles.sportAndNameContainer}>
        {athlete?.sport?.title && (
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
              {athlete.sport.title}
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
        {athlete?.profilePhoto?.fileUrl && (
          <View style={pageStyles.imageContainer}>
            <Text style={pageStyles.imageLabel}>Profile photo</Text>
            <Image
              source={{
                uri: athlete.profilePhoto.fileUrl,
              }}
              style={pageStyles.imageItem}
            />
          </View>
        )}

        {athlete?.featuredImage?.fileUrl && (
          <View style={pageStyles.imageContainer}>
            <Text style={pageStyles.imageLabel}>Featured image</Text>
            <Image
              source={{
                uri: athlete.featuredImage.fileUrl,
              }}
              style={pageStyles.imageItem}
            />
          </View>
        )}
        {athlete?.relatedMedia?.length > 0 && (
          <View style={pageStyles.imageContainer}>
            <Text style={pageStyles.imageLabel}>Related media</Text>
            <ImageGrid
              style={pageStyles.imageGrid}
              images={athlete.relatedMedia.map((img) => img.fileUrl)}
            />
          </View>
        )}
      </View>
    </View>
  );
};
