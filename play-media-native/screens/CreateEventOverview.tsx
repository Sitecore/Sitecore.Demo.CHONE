import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { canSubmitEvent } from '../helpers/events';
import { generateID } from '../helpers/uuid';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { IIndexable } from '../interfaces/indexable';
import { styles } from '../theme/styles';

export const CreateEventOverviewScreen = ({ navigation }) => {
  const [stateKey] = useState<string>(generateID());
  const { contentItems, editMultiple, init, reset } = useContentItems();

  const [fields, setFields] = useState<IIndexable>({
    title: '',
  });

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
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

    // reset global state on unmount
    //
    return () => {
      reset({ id: stateKey });
    };
  }, [init, reset, stateKey]);

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
    </KeyboardAwareScreen>
  );
};
