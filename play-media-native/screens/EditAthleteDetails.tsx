import { useCallback, useEffect, useState } from "react";
import { ScrollView, View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { getDate, getYear } from "../helpers/dateHelper";
import { theme } from "../theme/theme";
import { Athlete } from "../interfaces/athlete";
import { AthleteImages } from "../features/Screens/AthleteImages";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { DatePicker } from "../components/DatePicker/DatePicker";
import { athleteStyles } from "./CreateAthlete/styles";
import { getAllSports } from "../api/queries/getSports";
import { SportPicker } from "../features/SportPicker/SportPicker";

export const EditAthleteDetailsScreen = ({ route, navigation }) => {
  const [name, handleChangeName] = useState("");
  const [nationality, handleChangeNationality] = useState("");
  const [quote, handleChangeQuote] = useState("");
  const [birthDate, handleChangeBirthDate] = useState(new Date());
  const [careerStartDate, handleChangeCareerStartDate] = useState(new Date());
  const [hobby, handleChangeHobby] = useState("");

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showCareerStartDatePicker, setShowCareerStartDatePicker] =
    useState(false);

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
    navigation.navigate("AthleteReview", {
      title: "Review edited athlete",
      isReview: true,
    });
  }, []);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, []);

  const { data, isFetching: isFetchingAthletes } = useQuery(
    "editathlete",
    () => getAthleteById(route.params.id),
    { onSuccess: (data) => setAthleteData(data.athlete) }
  );
  const athlete = data?.athlete;

  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (isFetchingAthletes || isFetchingSports) {
    return <LoadingScreen />;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  // TODO Add state for media items
  const handleAddMedia = (id: string, title: string) => {
    navigation.navigate("AddMedia", {
      id,
      title,
    });
  };

  return (
    <Screen>
      <ScrollView style={styles.screenPadding}>
        <View>
          <SportPicker
            sports={sports}
            initialValue={athlete.sport?.results[0]?.title}
          />
        </View>
        <View>
          <Text style={athleteStyles.label}>Athlete name</Text>
          <TextInput
            style={athleteStyles.textInput}
            onChangeText={handleChangeName}
            value={name}
          />
          <Text style={athleteStyles.label}>Nationality</Text>
          <TextInput
            style={athleteStyles.textInput}
            onChangeText={handleChangeNationality}
            value={nationality}
          />
          <Text style={athleteStyles.label}>Quote</Text>
          <TextInput
            style={athleteStyles.textInput}
            onChangeText={handleChangeQuote}
            value={quote}
            selection={quoteInputCursor}
            onSelectionChange={({ nativeEvent: { selection } }) =>
              setQuoteInputCursor(selection)
            }
            onPressIn={() =>
              setQuoteInputCursor({ start: quote.length, end: quote.length })
            }
          />
          <Text style={athleteStyles.label}>Birth date</Text>
          <TextInput
            style={athleteStyles.textInput}
            onTouchStart={() => setShowBirthDatePicker(true)}
            value={getDate(birthDate)}
            showSoftInputOnFocus={false}
            caretHidden={true}
          />
          {showBirthDatePicker && (
            <DatePicker
              value={birthDate}
              visible={showBirthDatePicker}
              onChange={handleChangeBirthDate}
              onClose={setShowBirthDatePicker}
            />
          )}
          <Text style={athleteStyles.label}>Career start</Text>
          <TextInput
            style={athleteStyles.textInput}
            onTouchStart={() => setShowCareerStartDatePicker(true)}
            value={getYear(careerStartDate)}
            showSoftInputOnFocus={false}
            caretHidden={true}
          />
          {showCareerStartDatePicker && (
            <DatePicker
              value={careerStartDate}
              visible={showCareerStartDatePicker}
              onChange={handleChangeCareerStartDate}
              onClose={setShowCareerStartDatePicker}
            />
          )}
          <Text style={athleteStyles.label}>Hobby</Text>
          <TextInput
            style={[
              athleteStyles.textInput,
              { marginBottom: theme.spacing.md },
            ]}
            onChangeText={handleChangeHobby}
            value={hobby}
          />
        </View>
        <AthleteImages
          athlete={athlete}
          isEditMode={true}
          onAddBtnPress={() => handleAddMedia(athlete.id, athlete.athleteName)}
        />
      </ScrollView>
      <BottomActions style={athleteStyles.actionBtns}>
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
