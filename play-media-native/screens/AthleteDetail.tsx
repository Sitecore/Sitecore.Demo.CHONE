import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, AnimatedFAB, Button, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { createContentItem, updateContentItem } from '../api/queries/contentItems';
import { getAthleteById } from '../api/queries/getAthletes';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Toast } from '../components/Toast/Toast';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { CardShadowBox } from '../features/CardShadowBox/CardShadowBox';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { AthleteImages } from '../features/Screens/AthleteImages';
import { getAccentColor, getTextColor } from '../helpers/colorHelper';
import { mapContentItem } from '../helpers/contentItemHelper';
import { getDate, getYear } from '../helpers/dateHelper';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

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
  bottomFAB: {
    position: 'absolute',
    right: theme.spacing.sm,
    bottom: theme.spacing.xs,
  },
  actionBtns: {
    paddingBottom: 0,
    paddingRight: theme.spacing.xs,
  },
});

export const AthleteDetailScreen = ({ route, navigation }) => {
  const [athlete, setAthlete] = useState<Partial<Athlete>>(undefined);
  const [error, setError] = useState<unknown>();
  const { isTopEdge, calcScrollOffset } = useScrollOffset(true);

  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [shouldShowBottomActions, setShouldShowBottomActions] = useState(true);

  const [newAthleteID, setNewAthleteID] = useState(undefined);

  const isReview = route.params.isReview;
  const isNewAthlete = route.params.isNewAthlete;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params]);

  // Hide bottom action buttons if a loading indicator or a toaster is shown
  useEffect(() => {
    if (isValidating || showSuccessToast || showErrorToast) {
      setShouldShowBottomActions(false);
    } else {
      setShouldShowBottomActions(true);
    }
  }, [isValidating, showSuccessToast, showErrorToast]);

  useEffect(() => {
    if (isReview) {
      // TODO Retrieve athlete to review from global store
      const athleteToReview = undefined;

      if (!athleteToReview) {
        return setError('Redux error');
      }

      setAthlete(athleteToReview);
    }
  }, [isReview]);

  const displayError = useCallback((e: unknown) => {
    console.error(e);
    return (
      <Screen centered>
        <Text>Athlete could not be fetched!</Text>
      </Screen>
    );
  }, []);

  const processResponse = useCallback((res: { id: string; name: string }) => {
    setNewAthleteID(res.id);
    setShowSuccessToast(true);
  }, []);

  const handleSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
    navigation.navigate('MainTabs', {
      screen: 'Athletes',
      id: newAthleteID,
    });
  }, [navigation, newAthleteID]);

  const handleErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  const handleEditInfo = useCallback(
    (id: string, title: string) => {
      navigation.navigate('EditAthleteDetails', {
        id,
        title,
      });
    },
    [navigation]
  );

  // TODO Save as draft functionality
  const handleDraftBtn = useCallback(() => {}, []);

  const handleSubmitBtn = useCallback(async () => {
    setIsValidating(true);

    // Map athlete object to a form suitable for the API request
    const requestFields = mapContentItem(athlete, (k, v) => ({
      value: v?.['results'] ? [...v['results'].map((obj: { id: string }) => ({ id: obj.id }))] : v,
    }));
    // Delete the id from the request fields to avoid errors
    delete requestFields.id;

    if (isNewAthlete) {
      await createContentItem({
        contentTypeId: CONTENT_TYPES.ATHLETE,
        name: athlete.athleteName,
        fields: requestFields,
      })
        .then((res: { id: string; name: string }) => processResponse(res))
        .catch(() => setShowErrorToast(true))
        .finally(() => setIsValidating(false));
    } else {
      await updateContentItem({
        id: athlete.id,
        name: athlete.athleteName,
        fields: requestFields,
      })
        .then((res: { id: string; name: string }) => processResponse(res))
        .catch(() => setShowErrorToast(true))
        .finally(() => setIsValidating(false));
    }
  }, [athlete, isNewAthlete, processResponse]);

  const bottomActions = useMemo(
    () =>
      isReview ? (
        <BottomActions style={pageStyles.actionBtns}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleDraftBtn}
          >
            Save as draft
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleSubmitBtn}
          >
            Submit
          </Button>
        </BottomActions>
      ) : (
        <AnimatedFAB
          icon={({ size }) => (
            <FontAwesomeIcon icon={faEdit} color={theme.colors.black.DEFAULT} size={size} />
          )}
          label="Edit"
          extended={isTopEdge}
          onPress={() => handleEditInfo(athlete.id, athlete.athleteName)}
          style={pageStyles.bottomFAB}
        />
      ),
    [athlete, isTopEdge, isReview, handleEditInfo, handleDraftBtn, handleSubmitBtn]
  );

  const { isFetching } = useQuery('athlete', () => getAthleteById(route.params.id), {
    staleTime: 0,
    enabled: !route.params.isReview,
    onSuccess: (data) => {
      setAthlete(data.athlete);
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (error) {
    return displayError(error);
  }

  if (isFetching || !athlete) {
    return <LoadingScreen />;
  }

  const accentColor =
    getAccentColor(athlete?.sport?.results[0]?.title) || theme.colors.gray.DEFAULT;
  const textColor = getTextColor(accentColor) || theme.colors.white.DEFAULT;

  return (
    <Screen>
      <ScrollView onScroll={calcScrollOffset} scrollEventThrottle={0}>
        <View style={pageStyles.sportAndNameContainer}>
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
        </View>
        <View style={styles.screenPadding}>
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
          <View style={pageStyles.cardContainer}>
            <CardShadowBox color={accentColor}>
              <View style={pageStyles.infoContainer}>
                <Text style={pageStyles.infoLabel}>Nationality</Text>
                <Text style={pageStyles.infoItem}>{athlete.nationality}</Text>
                <Text style={pageStyles.infoLabel}>Hobby</Text>
                <Text style={pageStyles.infoItem}>{athlete.hobby}</Text>
                <Text style={pageStyles.infoLabel}>Date of birth</Text>
                <Text style={pageStyles.infoItem}>{getDate(athlete.dateOfBirth)}</Text>
                <Text style={pageStyles.infoLabel}>Career start</Text>
                <Text style={pageStyles.infoItem}>{getYear(athlete.careerStartDate)}</Text>
              </View>
            </CardShadowBox>
          </View>
          <AthleteImages athlete={athlete} />
        </View>
      </ScrollView>
      {isValidating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Toast
        duration={2000}
        message={isNewAthlete ? 'Athlete created successfully!' : 'Athlete updated successfully!'}
        onDismiss={handleSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        duration={2000}
        message={isNewAthlete ? 'Athlete could not be created' : 'Athlete could not be updated'}
        onDismiss={handleErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
      {shouldShowBottomActions && bottomActions}
    </Screen>
  );
};
