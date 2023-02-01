import { Screen } from "../../features/Screen/Screen";
import { Stepper } from "../../components/Stepper/Stepper";
import { useCallback, useMemo, useState } from "react";
import { General } from "./General";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { Button } from "react-native-paper";
import { styles } from "../../theme/styles";
import { athleteStyles } from "./styles";

export const CreateAthleteScreen = ({ navigation }) => {
  let [step, setStep] = useState(0);

  const steps = ["General", "Content", "References"];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return <General />;
    }

  }, [step]);

  const handleDiscardBtn = () => {
    navigation.goBack();
  };
  const handleNextBtn = () => {
    onStepPress(++step);
  };
  const handleSubmitBtn = () => {
    // TODO Submit API request
  };

  return (
    <Screen>
      <Stepper
        labels={steps}
        onPress={onStepPress}
        stepIndex={step}
        steps={steps}
      />
      {displayedScreen}
      <BottomActions style={athleteStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => handleDiscardBtn()}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() =>
            step === steps.length - 1 ? handleSubmitBtn() : handleNextBtn()
          }
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </BottomActions>
    </Screen>
  );
};
