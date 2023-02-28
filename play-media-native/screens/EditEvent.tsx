import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { FieldsEvent } from '../features/FieldsEvent/FieldsEvent';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { Event } from '../interfaces/event';
import { IIndexable } from '../interfaces/indexable';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const EditEventScreen = ({ navigation, route }) => {
  const [stateKey] = useState(route?.params?.stateKey);
  const { contentItems, editMultiple, reset } = useContentItems();

  const event = useMemo(
    () => contentItems[stateKey] ?? null,
    [contentItems, stateKey]
  ) as unknown as Event;

  const [fields, setFields] = useState<IIndexable>({
    title: event?.title || '',
    body: event?.body,
    teaser: event?.teaser || '',
    timeAndDate: event?.timeAndDate || new Date(),
    location: event?.location || '',
  });

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  }, []);

  const handleReview = useCallback(() => {
    editMultiple({
      id: stateKey,
      fields,
    });

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${fields.title || 'Event'}`,
    });
  }, [editMultiple, fields, navigation, stateKey]);

  const handleDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || 'Edit Event',
    });
  }, [event?.title, navigation]);

  // reset global state on unmount
  //
  useEffect(() => {
    return () => {
      reset({ id: stateKey });
    };
  }, [reset, stateKey]);

  if (!event) {
    return <Text>Event not available!</Text>;
  }

  return (
    <Screen>
      <FieldsEvent
        event={event}
        fields={fields}
        initialRoute="EditEvent"
        handleFieldChange={handleFieldChange}
        stateKey={stateKey}
      />
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
          onPress={handleDiscard}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleReview}
        >
          Review
        </Button>
      </BottomActions>
    </Screen>
  );
};
