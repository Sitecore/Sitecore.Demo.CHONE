import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { CreateConfirmationModal } from '../features/CreateConfirmationModal/CreateConfirmationModal';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitEvent } from '../helpers/events';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { IIndexable } from '../interfaces/indexable';
import { RootStackParamList } from '../interfaces/navigators';
import { styles } from '../theme/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEventOverview'>;

export const CreateEventOverviewScreen = ({ navigation }: Props) => {
  const [stateKey] = useState<string>(generateID());
  const { contentItems, editMultiple, init, reset } = useContentItems();

  const [fields, setFields] = useState<IIndexable>({
    title: '',
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationActions, setConfirmationActions] = useState<{
    continue: () => void;
    discard: () => void;
  }>({
    continue: null,
    discard: null,
  });

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setShowConfirmationModal(false);
  }, []);

  const onDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onAddDetails = useCallback(() => {
    editMultiple({
      id: stateKey,
      fields,
    });

    navigation.navigate('CreateEventDetailed', {
      stateKey,
      title: `Review ${fields.title || 'Event'}`,
    });
  }, [editMultiple, fields, navigation, stateKey]);

  const isDisabled = !canSubmitEvent(fields, contentItems[stateKey]);

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
  }, [init, reset, stateKey]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        // Prevent default behavior of leaving the screen
        //
        event.preventDefault();

        setConfirmationActions({
          discard: () => {
            navigation.dispatch(event.data.action);
            reset({ id: stateKey });
          },
          continue: () => {
            closeModal();
          },
        });
        setShowConfirmationModal(true);
      });

      // Make sure to remove the listener
      // Otherwise, it BLOCKS GOING BACK to MainTabs from the next screen
      //
      return () => {
        unsubscribe();
      };
    }, [closeModal, navigation, reset, stateKey])
  );

  return (
    <KeyboardAwareScreen>
      <FieldsEvent
        fields={fields}
        initialRoute="CreateEventOverview"
        handleFieldChange={handleFieldChange}
        showLimitedFields
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
              onPress={onAddDetails}
            >
              Add Details
            </Button>
          </View>
        </View>
      </BottomActions>
      <CreateConfirmationModal
        onContinue={confirmationActions.continue}
        onDiscard={confirmationActions.discard}
        onDismiss={closeModal}
        visible={showConfirmationModal}
      />
    </KeyboardAwareScreen>
  );
};
