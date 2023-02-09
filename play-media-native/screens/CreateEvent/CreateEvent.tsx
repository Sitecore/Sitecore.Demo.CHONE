import { useCallback, useEffect, useMemo, useState } from "react";
import { Stepper } from "../../components/Stepper/Stepper";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { FieldsView } from "./FieldsView";
import { RichTextView } from "./RichTextView";
import { ReferencesView } from "./ReferencesView";
import { Screen } from "../../features/Screen/Screen";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { useFocusEffect } from "@react-navigation/native";
import { Sport } from "../../interfaces/sport";
import { getAllSports } from "../../api/queries/getSports";
import { useQuery } from "react-query";

export const CreateEventScreen = ({ navigation, route }) => {
  const { eventFields, edit, reset } = useEventFields();
  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const [title, setTitle] = useState();
  const [body, setBody] = useState<string>();
  const [sport, setSport] = useState<Sport>();
  const [summary, setSummary] = useState();
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ["Fields", "Rich Text", "References"];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const handleSportChange = useCallback(
    (sportName: string) => {
      setSport(sports.find((sport) => sport.title === sportName));
    },
    [sports]
  );

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return (
        <FieldsView
          date={date}
          handleSportChange={handleSportChange}
          location={location}
          setDate={setDate}
          setLocation={setLocation}
          setShowDatePicker={setShowDatePicker}
          setTitle={setTitle}
          showDatePicker={showDatePicker}
          sport={sport}
          sports={sports}
          title={title}
        />
      );
    }

    if (step === 1) {
      return (
        <RichTextView
          setBody={setBody}
          summary={summary}
          setSummary={setSummary}
        />
      );
    }

    return <ReferencesView />;
  }, [
    date,
    location,
    title,
    sport,
    step,
    showDatePicker,
    handleSportChange,
    setShowDatePicker,
  ]);

  const onBack = useCallback(() => {
    if (step !== 0) {
      setStep(step - 1);
    }
  }, [step]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onNext = useCallback(() => {
    if (step !== 2) {
      setStep(step + 1);
      return;
    }

    navigation.navigate("ReviewEvent", {
      title: title || "Review Event",
      event: {
        ...eventFields,
        body,
        location,
        sport: sports[0],
        summary,
        timeAndDate: date,
        title,
      },
    });
  }, [
    body,
    location,
    sports,
    summary,
    date,
    title,
    eventFields,
    navigation,
    step,
  ]);

  // reset global state on unmount
  //
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Check route params for images added from route EditMedia (camera, library)
  //
  useFocusEffect(
    useCallback(() => {
      if (!route?.params?.isEditMedia || !route?.params?.key) {
        return;
      }

      if (Array.isArray(eventFields[route.params.key])) {
        edit({
          key: route.params.key,
          value: [...eventFields[route.params.key], route.params.image],
        });
      } else {
        edit({ key: route.params.key, value: route.params.image });
      }
    }, [edit, route?.params])
  );

  return (
    <Screen>
      <Stepper
        labels={steps}
        onPress={onStepPress}
        stepIndex={step}
        steps={steps}
      />
      {displayedScreen}
      <BottomActions>
        {step !== 0 && (
          <Button
            mode="outlined"
            labelStyle={styles.buttonLabel}
            style={styles.button}
            onPress={onBack}
          >
            Back
          </Button>
        )}
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onNext}
        >
          {step !== 2 ? "Next" : "Review"}
        </Button>
      </BottomActions>
    </Screen>
  );
};
