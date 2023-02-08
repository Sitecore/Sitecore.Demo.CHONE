import { Screen } from "../../features/Screen/Screen";
import { Stepper } from "../../components/Stepper/Stepper";
import { useCallback, useMemo, useState } from "react";
import { General } from "./General";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { Content } from "./Content";
import { useQuery } from "react-query";
import { getAllSports } from "../../api/queries/getSports";
import { LoadingScreen } from "../../features/LoadingScreen/LoadingScreen";
import { References } from "./References";
import { theme } from "../../theme/theme";

export const CreateAthleteScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [sports, setSports] = useState([]);

  const steps = ["General", "Content", "References"];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, []);
  const handleNextBtn = useCallback(() => {
    setStep(step + 1);
  }, [step]);
  const handleSubmitBtn = useCallback(() => {
    navigation.navigate("AthleteReview", {
      title: "Review new athlete",
      isReview: true,
    });
  }, []);

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return <General sports={sports} />;
    }

    if (step === 1) {
      return <Content />;
    }

    return <References />;
  }, [step, sports]);

  const { data, isFetching } = useQuery("sports", () => getAllSports(), {
    onSuccess: (data) => setSports(data),
  });

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <Stepper
        labels={steps}
        onPress={onStepPress}
        stepIndex={step}
        steps={steps}
      />
      {displayedScreen}
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
          onPress={step === steps.length - 1 ? handleSubmitBtn : handleNextBtn}
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </BottomActions>
    </Screen>
  );
};
