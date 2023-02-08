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

export const CreateEventScreen = ({ navigation, route }) => {
  const { eventFields, edit, reset } = useEventFields();
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

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {}, []);

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
          onPress={onSubmit}
        >
          Create
        </Button>
      </BottomActions>
    </Screen>
  );
};
