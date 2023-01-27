import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { getAthleteById } from "../api/queries/getAthletes";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { getAccentColor } from "../helpers/colorHelper";
import { getDate, getYear } from "../helpers/dateHelper";
import { theme } from "../theme/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Athlete } from "../interfaces/athlete";
import { AthleteImages } from "../features/Screens/AthleteImages";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";

const pageStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black.darkest,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  button: {
    position: "absolute",
    right: -theme.spacing.sm,
    top: -theme.spacing.xs,
  },
  label: {
    color: theme.colors.white.DEFAULT,
    marginBottom: theme.spacing.xxs,
  },
  item: {
    marginBottom: theme.spacing.xs,
  },
  textInput: {
    height: 37,
    backgroundColor: theme.colors.white.DEFAULT,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  actionBtns: { paddingBottom: 0, paddingRight: theme.spacing.xs },
});

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

  const { data, isFetching } = useQuery(
    "editathlete",
    () => getAthleteById(route.params.id),
    { onSuccess: (data) => setAthleteData(data.athlete) }
  );
  const athlete = data?.athlete;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!athlete) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  // TODO Update with the edit sport screen when available and relevant state
  const handleChangeSport = (id: string, title: string) => {
    // navigation.navigate("EditSport", {
    //   id,
    //   title,
    // });
  };

  // TODO Add state for media items
  const handleAddMedia = (id: string, title: string) => {
    navigation.navigate("AddMedia", {
      id,
      title,
    });
  };

  // TODO Add functionality to action buttons
  const handlePublishBtn = () => {};
  const handleDiscardBtn = () => {};

  return (
    <Screen>
      <ScrollView style={styles.screenPadding}>
        <View>
          <Text style={pageStyles.label}>Sport</Text>
          <Text
            style={[
              pageStyles.item,
              {
                color: getAccentColor(athlete.sport.results[0]?.title),
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            {athlete.sport.results[0].title}
          </Text>
        </View>
        <View>
          <Text style={pageStyles.label}>Athlete name</Text>
          <TextInput
            style={pageStyles.textInput}
            onChangeText={handleChangeName}
            value={name}
          />
          <Text style={pageStyles.label}>Nationality</Text>
          <TextInput
            style={pageStyles.textInput}
            onChangeText={handleChangeNationality}
            value={nationality}
          />
          <Text style={pageStyles.label}>Quote</Text>
          <TextInput
            style={pageStyles.textInput}
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
          <Text style={pageStyles.label}>Birth date</Text>
          <TextInput
            style={pageStyles.textInput}
            onTouchStart={() => setShowBirthDatePicker(true)}
            value={getDate(birthDate)}
            showSoftInputOnFocus={false}
            caretHidden={true}
          />
          {showBirthDatePicker && (
            <DateTimePicker
              value={new Date(birthDate)}
              mode={"date"}
              onChange={(e, selectedDate) => {
                setShowBirthDatePicker(false);
                handleChangeBirthDate(selectedDate);
              }}
            />
          )}
          <Text style={pageStyles.label}>Career start</Text>
          <TextInput
            style={pageStyles.textInput}
            onTouchStart={() => setShowCareerStartDatePicker(true)}
            value={getYear(careerStartDate)}
            showSoftInputOnFocus={false}
            caretHidden={true}
          />
          {showCareerStartDatePicker && (
            <DateTimePicker
              value={new Date(careerStartDate)}
              mode={"date"}
              onChange={(e, selectedDate) => {
                setShowCareerStartDatePicker(false);
                handleChangeCareerStartDate(selectedDate);
              }}
            />
          )}
          <Text style={pageStyles.label}>Hobby</Text>
          <TextInput
            style={[pageStyles.textInput, { marginBottom: theme.spacing.md }]}
            onChangeText={handleChangeHobby}
            value={hobby}
          />
        </View>
        <AthleteImages
          athlete={athlete}
          isEditMode={true}
          onAddBtnPress={() => handleAddMedia(athlete.id, athlete.athleteName)}
        />
        <Button
          style={pageStyles.button}
          textColor={theme.colors.yellow.DEFAULT}
          icon={({ size }) => (
            <FontAwesomeIcon
              icon={faEdit}
              color={theme.colors.yellow.DEFAULT}
              size={size}
            />
          )}
          onPress={() => handleChangeSport(athlete.id, athlete.athleteName)}
        >
          Change
        </Button>
      </ScrollView>
      <BottomActions style={pageStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => handleDiscardBtn()}
        >
          Discard
        </Button>
        <Button
          // disabled={!media?.length}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => handlePublishBtn()}
        >
          Publish
        </Button>
      </BottomActions>
    </Screen>
  );
};
