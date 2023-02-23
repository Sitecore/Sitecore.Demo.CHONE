import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { KeyboardAwareScreen } from '../features/Screen/KeyboardAwareScreen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { IIndexable } from '../interfaces/indexable';
import { styles } from '../theme/styles';

export const CreateEventDetailedScreen = ({ navigation, route }) => {
  const stateKey = route?.params?.stateKey;
  const { contentItems, editMultiple } = useContentItems();
  const event = useMemo(
    () => contentItems[stateKey] ?? null,
    [contentItems, stateKey]
  ) as unknown as Event;

  const [fields, setFields] = useState<IIndexable>({
    title: event?.title || '',
    body: event?.body || null,
    teaser: event?.teaser || '',
    date: event?.timeAndDate || new Date(),
    location: event?.location || '',
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

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${fields.title || 'Event'}`,
    });
  }, [editMultiple, fields, navigation, stateKey]);

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
    </KeyboardAwareScreen>
  );
};
