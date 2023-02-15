import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAthleteById } from '../api/queries/getAthletes';
import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { InputText } from '../components/InputText/InputText';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { AthleteImages } from '../features/Screens/AthleteImages';
import { SportPicker } from '../features/SportPicker/SportPicker';
import { getDate, getYear } from '../helpers/dateHelper';
import { Athlete } from '../interfaces/athlete';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const EditAthleteDetailsScreen = ({ route, navigation }) => {
  const [name, handleChangeName] = useState('');
  const [nationality, handleChangeNationality] = useState('');
  const [quote, handleChangeQuote] = useState('');
  const [birthDate, handleChangeBirthDate] = useState(new Date());
  const [careerStartDate, handleChangeCareerStartDate] = useState(new Date());
  const [hobby, handleChangeHobby] = useState('');

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showCareerStartDatePicker, setShowCareerStartDatePicker] = useState(false);

  const setAthleteData = (athlete: Partial<Athlete>) => {
    handleChangeName(athlete.athleteName);
    handleChangeNationality(athlete.nationality);
    handleChangeQuote(athlete.athleteQuote);
    handleChangeBirthDate(athlete.dateOfBirth);
    handleChangeCareerStartDate(athlete.careerStartDate);
    handleChangeHobby(athlete.hobby);
  };

  const [quoteInputCursor, setQuoteInputCursor] = useState({
    start: 0,
    end: 0,
  });

  const handleSubmitBtn = useCallback(() => {
    navigation.navigate('AthleteReview', {
      title: 'Review edited athlete',
      isReview: true,
    });
  }, [navigation]);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const { data, isFetching: isFetchingAthletes } = useQuery(
    'editathlete',
    () => getAthleteById(route.params.id),
    { onSuccess: (data) => setAthleteData(data.athlete) }
  );
  const athlete = data?.athlete;

  const { data: sports, isFetching: isFetchingSports } = useQuery('sports', () => getAllSports());

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params.title]);

  if (isFetchingAthletes || isFetchingSports) {
    return <LoadingScreen />;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  // TODO Add state for media items
  // const handleAddMedia = (id: string, title: string) => {
  //   navigation.navigate('AddMedia', {
  //     id,
  //     title,
  //   });
  // };

  return (
    <Screen>
      <ScrollView style={styles.screenPadding}>
        <View>
          <SportPicker
            onChange={() => {}}
            sports={sports}
            initialValue={athlete.sport?.results[0]?.title}
          />
        </View>
        <View>
          <InputText onChange={handleChangeName} value={name} title="Athlete name" />
          <InputText onChange={handleChangeNationality} value={nationality} title="Nationality" />
          <InputText
            onChange={handleChangeQuote}
            value={quote}
            title="Quote"
            selection={quoteInputCursor}
            onSelectionChange={({ nativeEvent: { selection } }) => setQuoteInputCursor(selection)}
            onPressIn={() => setQuoteInputCursor({ start: quote.length, end: quote.length })}
          />
          <Pressable onPress={() => setShowBirthDatePicker(true)}>
            <View pointerEvents="none">
              <InputText
                value={getDate(birthDate)}
                title="Birth date"
                showSoftInputOnFocus={false}
                caretHidden
              />
            </View>
          </Pressable>
          {showBirthDatePicker && (
            <DatePicker
              value={birthDate}
              visible={showBirthDatePicker}
              onChange={handleChangeBirthDate}
              onClose={setShowBirthDatePicker}
            />
          )}
          <InputText
            value={getYear(careerStartDate)}
            title="Career start"
            showSoftInputOnFocus={false}
            caretHidden
            onTouchStart={() => setShowCareerStartDatePicker(true)}
          />
          <Pressable onPress={() => setShowCareerStartDatePicker(true)}>
            <View pointerEvents="none">
              <InputText
                value={getYear(careerStartDate)}
                title="Career start"
                showSoftInputOnFocus={false}
                caretHidden
              />
            </View>
          </Pressable>
          {showCareerStartDatePicker && (
            <DatePicker
              value={careerStartDate}
              visible={showCareerStartDatePicker}
              onChange={handleChangeCareerStartDate}
              onClose={setShowCareerStartDatePicker}
            />
          )}
          <InputText onChange={handleChangeHobby} value={hobby} title="Hobby" />
        </View>
        <AthleteImages athlete={athlete} isEditMode />
      </ScrollView>
      <BottomActions
        style={{
          paddingBottom: 0,
          paddingRight: theme.spacing.xs,
        }}
      >
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDiscardBtn}
        >
          Discard
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
    </Screen>
  );
};
