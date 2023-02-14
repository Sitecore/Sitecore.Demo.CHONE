import { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { DraggableList } from '../components/DraggableList/DraggableList';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { Screen } from '../features/Screen/Screen';
import { useEvents } from '../hooks/useEvents/useEvents';
import { Event } from '../interfaces/event';
import { styles } from '../theme/styles';

export const ReviewEventsScreen = ({ navigation }) => {
  const { events } = useEvents();

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {}, []);

  return (
    <Screen>
      <DraggableList
        items={events}
        renderItem={(item: Event) => <CardEvent item={item} />}
        style={{ paddingBottom: 170 }}
      />
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onCancel}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onSubmit}
        >
          Apply Changes
        </Button>
      </BottomActions>
    </Screen>
  );
};
