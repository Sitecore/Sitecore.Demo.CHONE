import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
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

const styles = StyleSheet.create({
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
    fontFamily: theme.fontFamily.bold,
  },
  textInput: {
    height: 37,
    backgroundColor: theme.colors.white.DEFAULT,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  imageContainer: {
    marginBottom: theme.spacing.md,
  },
  imageLabel: {
    color: theme.colors.gray.DEFAULT,
    marginBottom: theme.spacing.xs,
  },
  imageItem: { height: 300, width: "100%", marginTop: theme.spacing.xs },
  imageGrid: {
    marginTop: theme.spacing.xs,
  },
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

  // TODO
  const handleChangeSport = (id: string, title: string) => {
    navigation.navigate("EditSport", {
      id,
      title,
    });
  };

  // TODO
  const handleAddMedia = (id: string, title: string) => {
    navigation.navigate("AddMedia", {
      id,
      title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => handleChangeSport(athlete.id, athlete.athleteName)}
        >
          <View>
            <Button
              style={styles.button}
              textColor={theme.colors.yellow.DEFAULT}
              icon={({ size }) => (
                <FontAwesomeIcon
                  icon={faEdit}
                  color={theme.colors.yellow.DEFAULT}
                  size={size}
                />
              )}
            >
              Change
            </Button>
            <Text style={styles.label}>Sport</Text>
            <Text
              style={[
                styles.item,
                {
                  color: getAccentColor(athlete.sport.results[0]?.title),
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              {athlete.sport.results[0].title}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.label}>Athlete name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChangeName}
            value={name}
          />
          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChangeNationality}
            value={nationality}
          />
          <Text style={styles.label}>Quote</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChangeQuote}
            value={quote}
          />
          <Text style={styles.label}>Birth date</Text>
          <TextInput
            style={styles.textInput}
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
          <Text style={styles.label}>Career start</Text>
          <TextInput
            style={styles.textInput}
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
          <Text style={styles.label}>Hobby</Text>
          <TextInput
            style={[styles.textInput, { marginBottom: theme.spacing.md }]}
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
    </SafeAreaView>
  );
};
