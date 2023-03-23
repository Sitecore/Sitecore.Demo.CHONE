import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CREATE_EVENT_DISCARD_MESSAGE, FIELD_OVERRIDES_EVENT } from '../constants/event';
import { ContentItemFields } from '../features/ContentItemFields/ContentItemFields';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitContentItem } from '../helpers/contentItemHelper';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventDetailed'>;

export const CreateEventDetailedScreen = ({ navigation, route }: Props) => {
  // store stateKey in a ref so it's stable and does not require passing as route param during nav flows
  //
  const stateKeyRef = useRef({ stateKey: route?.params?.stateKey });
  const stateKey = stateKeyRef?.current?.stateKey;

  const { contentItems } = useContentItems();
  const event = (contentItems[stateKey] ?? null) as unknown as Event;

  const isDisabled = !canSubmitContentItem(event, FIELD_OVERRIDES_EVENT);

  const onDiscard = useCallback(() => {
    navigation.push('DiscardChanges', {
      message: CREATE_EVENT_DISCARD_MESSAGE,
      stateKey,
      redirectRoute: 'MainTabs',
      title: event?.title,
      subtitle: 'Discard new event?',
    });
  }, [event?.title, navigation, stateKey]);

  const onReview = useCallback(() => {
    navigation.navigate('ReviewEvent', {
      isNew: true,
      stateKey,
      title: event?.title,
    });
  }, [event, navigation, stateKey]);

  return (
    <KeyboardAwareScreen>
      <ContentItemFields
        initialRoute="CreateEventDetailed"
        overrides={FIELD_OVERRIDES_EVENT}
        showLimited
        stateKey={stateKey}
        headerTitle={event?.title}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onDiscard}
        >
          Discard
        </Button>
        <Button
          disabled={isDisabled}
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={isDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          onPress={onReview}
        >
          Review
        </Button>
      </BottomActions>
    </KeyboardAwareScreen>
  );
};
