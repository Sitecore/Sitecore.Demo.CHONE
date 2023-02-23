import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Portal, Modal } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const DatePicker = ({ value, visible, onChange, onClose }) => {
  const iosDatePicker = (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => onClose()}
        contentContainerStyle={{
          marginHorizontal: theme.spacing.sm,
          padding: theme.spacing.sm,
          backgroundColor: theme.colors.black.DEFAULT,
        }}
      >
        <DateTimePicker
          display="inline"
          themeVariant="dark"
          accentColor={theme.colors.yellow.DEFAULT}
          value={new Date(value)}
          mode="date"
          onChange={(_, selectedDate) => {
            onChange(selectedDate);
          }}
        />
      </Modal>
    </Portal>
  );

  const androidDatePicker = (
    <DateTimePicker
      value={new Date(value)}
      mode="date"
      onChange={(_, selectedDate) => {
        onClose();
        onChange(selectedDate);
      }}
    />
  );
  return Platform.OS === 'ios' ? iosDatePicker : androidDatePicker;
};
