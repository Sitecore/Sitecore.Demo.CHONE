import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CREATE_ATHLETE_DISCARD_MESSAGE, FIELD_OVERRIDES_ATHLETE } from '../constants/athlete';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitContentItem } from '../helpers/contentItemHelper';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Athlete } from '../interfaces/athlete';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAthleteDetailed'>;

export const CreateAthleteDetailedScreen = ({ navigation, route }: Props) => {
  // store stateKey in a ref so it's stable and does not require passing as route param during nav flows
  //
  const stateKeyRef = useRef({ stateKey: route?.params?.stateKey });
  const stateKey = stateKeyRef?.current?.stateKey;

  const { contentItems } = useContentItems();
  const athlete = (contentItems[stateKey] ?? null) as unknown as Athlete;

  const isDisabled = !canSubmitContentItem(athlete, FIELD_OVERRIDES_ATHLETE);

  const onDiscard = useCallback(() => {
    navigation.push('DiscardChanges', {
      message: CREATE_ATHLETE_DISCARD_MESSAGE,
      stateKey,
      redirectRoute: 'MainTabs',
      title: athlete?.athleteName,
      subtitle: 'Discard new athlete?',
    });
  }, [athlete?.athleteName, navigation, stateKey]);

  const onReview = useCallback(() => {
    navigation.navigate('ReviewAthlete', {
      isNew: true,
      stateKey,
      title: athlete?.athleteName,
    });
  }, [athlete, navigation, stateKey]);

  return (
    <KeyboardAwareScreen>
      <ContentItemFields
        initialRoute="CreateAthleteDetailed"
        overrides={FIELD_OVERRIDES_ATHLETE}
        showLimited
        stateKey={stateKey}
        headerTitle={athlete?.athleteName}
      />
      <BottomActions>
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
              disabled={isDisabled}
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={isDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              onPress={onReview}
            >
              Review
            </Button>
          </View>
        </View>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
