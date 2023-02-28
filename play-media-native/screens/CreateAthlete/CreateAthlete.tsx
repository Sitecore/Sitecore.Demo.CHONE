import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';

import { Content } from './Content';
import { General } from './General';
import { References } from './References';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { Stepper } from '../../components/Stepper/Stepper';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { Screen } from '../../features/Screen/Screen';
import { useAthleteFields } from '../../hooks/useAthleteFields/useAthleteFields';
import { useSportsQuery } from '../../hooks/useSportsQuery/useSportsQuery';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

export const CreateAthleteScreen = ({ navigation, route }) => {
  const { athleteFields, edit, reset } = useAthleteFields();
  const [step, setStep] = useState(0);
  const [sports, setSports] = useState([]);

  const steps = ['General', 'Content', 'References'];

  const onStepPress = useCallback((index: number) => {
    setStep(index);
  }, []);

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const handleNextBtn = useCallback(() => {
    setStep(step + 1);
  }, [step]);
  const handleSubmitBtn = useCallback(() => {
    navigation.navigate('AthleteReview', {
      title: 'Review new athlete',
      isReview: true,
      isNewAthlete: true,
    });
  }, [navigation]);

  const displayedScreen = useMemo(() => {
    if (step === 0) {
      return <General sports={sports} />;
    }

    if (step === 1) {
      return <Content />;
    }

    return <References />;
  }, [step, sports]);

  const { data: sportsData, isFetching } = useSportsQuery();

  useEffect(() => setSports(sportsData), [sportsData]);
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

      if (Array.isArray(athleteFields[route.params.key])) {
        edit({
          key: route.params.key,
          value: [...athleteFields[route.params.key], route.params.image],
        });
      } else {
        edit({ key: route.params.key, value: route.params.image });
      }
    }, [athleteFields, edit, route.params])
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <Stepper labels={steps} onPress={onStepPress} stepIndex={step} steps={steps} />
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
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </BottomActions>
    </Screen>
  );
};
