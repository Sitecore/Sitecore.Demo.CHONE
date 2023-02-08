import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { getDate } from "../helpers/dateHelper";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { DatePicker } from "../components/DatePicker/DatePicker";
import { getAllSports } from "../api/queries/getSports";
import { SportPicker } from "../features/SportPicker/SportPicker";
import { InputText } from "../components/InputText/InputText";
import { theme } from "../theme/theme";
import { ContentFieldMedia } from "../features/ContentFieldMedia/ContentFieldMedia";
import { getAllEvents } from "../api/queries/getEvents";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";

export const EditEventScreen = ({ route, navigation }) => {
  const id = route?.params?.id;
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const { data: events, isFetching: isFetchingEvents } = useQuery(
    "events",
    () => getAllEvents()
  );
  const event = events ? events.find((item) => item.id === id) : null;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [body, setBody] = useState<string>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isLoading = isFetchingEvents || isFetchingSports;

  //   const setAthleteData = (athlete: Partial<Athlete>) => {
  //     handleChangeName(athlete.athleteName);
  //     handleChangeNationality(athlete.nationality);
  //     handleChangeQuote(athlete.athleteQuote);
  //     handleChangeBirthDate(athlete.dateOfBirth);
  //     handleChangeCareerStartDate(athlete.careerStartDate);
  //     handleChangeHobby(athlete.hobby);
  //   };

  const handleSubmitBtn = useCallback(() => {
    navigation.navigate("EventReview", {
      title: "Review edited event",
      isReview: true,
    });
  }, [navigation]);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  console.log("body", body);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!event && !isLoading) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  return (
    <Screen>
      <ScrollView style={styles.screenPadding}>
        <View>
          <SportPicker
            sports={sports}
            initialValue={event.sport?.results[0]?.title}
          />
        </View>
        <View>
          <InputText onChange={setTitle} value={title} title={"Title"} />
          <InputText onChange={setSummary} value={summary} title={"Summary"} />
          <InputText
            onChange={setLocation}
            value={location}
            title={"Location"}
          />
          <RichTextEditor onChange={(json: string) => setBody(json)} />
          <InputText
            value={getDate(date)}
            title={"Time and Date"}
            showSoftInputOnFocus={false}
            caretHidden={true}
            onTouchStart={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DatePicker
              value={date}
              visible={showDatePicker}
              onChange={setDate}
              onClose={setShowDatePicker}
            />
          )}
        </View>
        {/* <ContentFieldMedia /> */}
        <View style={{ paddingBottom: 75 }} />
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
