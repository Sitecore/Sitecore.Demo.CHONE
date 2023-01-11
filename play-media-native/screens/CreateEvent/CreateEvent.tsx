import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Stepper } from "../../components/Stepper/Stepper";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { theme } from "../../theme/theme";
import { FieldsView } from "./FieldsView";
import { RichTextView } from "./RichTextView";
import { ReferencesView } from "./ReferencesView";

export const CreateEventScreen = () => {
  const [step, setStep] = useState(0);
  const steps = ["Fields", "Rich Text", "References"];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return <FieldsView />;
    }

    if (step === 1) {
      return <RichTextView />;
    }

    return <ReferencesView />;
  }, [step]);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingTop: theme.spacing.xs,
      }}
    >
      <View style={{ width: "100%" }}>
        <Stepper
          labels={steps}
          onPress={onStepPress}
          stepIndex={step}
          steps={steps}
        />
      </View>
      {displayedScreen}
      <BottomActions />
    </View>
  );
};
