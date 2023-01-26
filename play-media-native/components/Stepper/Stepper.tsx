import StepIndicator from "react-native-step-indicator";
import { theme } from "../../theme/theme";

interface Props {
  labels?: string[];
  onPress: (step: number) => void;
  stepIndex: number;
  steps: string[];
}

export const Stepper = ({ labels, onPress, stepIndex, steps }: Props) => {
  const defaultColor = theme.colors.yellow.DEFAULT;
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: defaultColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: defaultColor,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: defaultColor,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: theme.colors.black.DEFAULT,
    stepIndicatorUnFinishedColor: theme.colors.black.DEFAULT,
    stepIndicatorCurrentColor: theme.colors.black.DEFAULT,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: defaultColor,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: defaultColor,
  };

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={stepIndex}
      labels={labels}
      onPress={onPress}
      stepCount={steps?.length || 0}
    />
  );
};
