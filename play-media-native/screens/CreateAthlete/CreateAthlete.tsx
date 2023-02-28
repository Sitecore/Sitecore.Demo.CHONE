import { useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../../components/BottomActions/BottomActions';
import { LoadingScreen } from '../../features/LoadingScreen/LoadingScreen';
import { Screen } from '../../features/Screen/Screen';
import { generateID } from '../../helpers/uuid';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { useSportsQuery } from '../../hooks/useSportsQuery/useSportsQuery';
import { Sport } from '../../interfaces/sport';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

export const CreateAthleteScreen = ({ navigation, route }) => {
  const [stateKey] = useState<string>(generateID());
  const { editMultiple, init, reset } = useContentItems();
  const { data: sports, isFetching } = useSportsQuery();

  // fields
  //
  const [athleteName, setAthleteName] = useState();
  const [athleteQuote, setAthleteQuote] = useState();
  const [careerStartDate, setCareerStartDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [hobby, setHobby] = useState<string>();
  const [isFeatured, setIsFeatured] = useState(false);
  const [nationality, setNationality] = useState<string>();
  const [sport, setSport] = useState<Sport>();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSportChange = useCallback(
    (sportName: string) => {
      setSport(sports.find((sport) => sport.title === sportName));
    },
    [sports]
  );

  const onDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSaveLocal = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAddDetails = useCallback(() => {
    editMultiple({
      id: stateKey,
      fields: {
        athleteName,
        athleteQuote,
        careerStartDate,
        dateOfBirth,
        hobby,
        isFeatured,
        nationality,
        sport: sport || sports[0],
      },
    });

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${athleteName || ''}`,
    });
  }, [
    athleteName,
    athleteQuote,
    careerStartDate,
    dateOfBirth,
    editMultiple,
    hobby,
    isFeatured,
    nationality,
    navigation,
    sport,
    sports,
    stateKey,
  ]);

  useEffect(() => {
    // init global state on mount
    //
    if (stateKey) {
      init({
        id: stateKey,
        fields: {
          sport: null,
          featuredImage: null,
          relatedMedia: [],
          athletes: [],
          similarEvents: [],
        },
      });
    }

    // reset global state on unmount
    //
    return () => {
      reset({ id: stateKey });
    };
  }, [init, reset, stateKey]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <BottomActions
        style={{
          paddingBottom: 0,
          paddingRight: theme.spacing.xs,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View>
            <Button
              mode="outlined"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onDiscard}
            >
              Discard
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              mode="outlined"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onSaveLocal}
            >
              Save Local
            </Button>
            <Button
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onAddDetails}
            >
              Add Details
            </Button>
          </View>
        </View>
      </BottomActions>
    </Screen>
  );
};
