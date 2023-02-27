import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CreateConfirmationModal } from '../features/CreateConfirmationModal/CreateConfirmationModal';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitEvent } from '../helpers/events';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { IIndexable } from '../interfaces/indexable';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventDetailed'>;

export const CreateEventDetailedScreen = ({ navigation, route }: Props) => {
  // store stateKey in a ref so it's stable and does not require passing as route param during nav flows
  //
  const stateKeyRef = useRef({ stateKey: route?.params?.stateKey });
  const stateKey = stateKeyRef?.current?.stateKey;

  const { contentItems, editMultiple, reset } = useContentItems();
  const event = useMemo(
    () => contentItems[stateKey] ?? null,
    [contentItems, stateKey]
  ) as unknown as Event;

  const [fields, setFields] = useState<IIndexable>({
    title: event?.title || '',
    body: event?.body || null,
    teaser: event?.teaser || '',
    timeAndDate: event?.timeAndDate || null,
    location: event?.location || '',
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const isDisabled = !canSubmitEvent(fields, contentItems[stateKey]);

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  }, []);

  const clearGlobalState = useCallback(() => {
    reset({ id: stateKey });
    stateKeyRef.current.stateKey = null;
  }, [reset, stateKey]);

  const closeModal = useCallback(() => {
    setShowConfirmationModal(false);
  }, []);

  const onModalDiscard = useCallback(() => {
    closeModal();
    clearGlobalState();
    navigation.navigate('MainTabs');
  }, [clearGlobalState, closeModal, navigation]);

  const onDiscard = useCallback(() => {
    setShowConfirmationModal(true);
  }, []);

  const onReview = useCallback(() => {
    editMultiple({
      id: stateKey,
      fields,
    });

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${fields.title || 'Event'}`,
    });
  }, [editMultiple, fields, navigation, stateKey]);

  // on unmount, save changed fields in global state
  // if state has been reset due to discarding whole flow, do nothing
  //
  useEffect(() => {
    return () => {
      if (!stateKey) {
        editMultiple({
          id: stateKey,
          fields,
        });
      }
    };
  }, [editMultiple, fields, stateKey]);

  return (
    <KeyboardAwareScreen>
      <FieldsEvent
        event={event}
        fields={fields}
        initialRoute="CreateEventDetailed"
        handleFieldChange={handleFieldChange}
        stateKey={stateKey}
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
      <CreateConfirmationModal
        onContinue={closeModal}
        onDiscard={onModalDiscard}
        onDismiss={closeModal}
        visible={showConfirmationModal}
      />
    </KeyboardAwareScreen>
  );
};
