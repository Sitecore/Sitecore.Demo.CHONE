import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CREATE_EVENT_DISCARD_MESSAGE, FIELD_OVERRIDES_EVENT } from '../constants/event';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
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
    });
  }, [navigation, stateKey]);

  const onReview = useCallback(() => {
    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${event?.title || 'Event'}`,
    });
  }, [event, navigation, stateKey]);

  return (
    <KeyboardAwareScreen>
      <FieldsEvent initialRoute="CreateEventDetailed" showLimited stateKey={stateKey} />
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
