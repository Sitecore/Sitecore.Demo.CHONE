import { View } from 'react-native';
import { Modal, Text, Button } from 'react-native-paper';

import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

export const CreateConfirmationModal = ({
  onContinue,
  onDiscard,
  onDismiss,
  visible,
}: {
  onContinue: () => void;
  onDiscard: () => void;
  onDismiss?: () => void;
  visible: boolean;
}) => {
  return (
    <Modal
      visible={visible}
      contentContainerStyle={{
        marginHorizontal: theme.spacing.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.black.DEFAULT,
      }}
      onDismiss={onDismiss}
    >
      <Text style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }} variant="headlineSmall">
        Are you sure?
      </Text>
      <Text style={{ textAlign: 'center' }}>
        If you discard you will lose your current progress.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: theme.spacing.md,
        }}
      >
        <Button onPress={onDiscard} style={styles.button}>
          Discard
        </Button>
        <Button onPress={onContinue} style={styles.button} mode="contained">
          Continue Editing
        </Button>
      </View>
    </Modal>
  );
};
