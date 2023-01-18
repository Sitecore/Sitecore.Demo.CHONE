import { Modal, Portal, Text, ActivityIndicator } from "react-native-paper";

interface Props {
  message?: string;
  onDismiss?: () => void;
  visible: boolean;
}

export const ModalLoader = ({ message, onDismiss, visible }: Props) => {
  return (
    <Portal>
      <Modal
        style={{ justifyContent: "center", alignItems: "center" }}
        visible={visible}
        onDismiss={onDismiss}
      >
        <ActivityIndicator
          animating
          size="large"
          style={{ marginBottom: 10 }}
        />
        <Text>{message}</Text>
      </Modal>
    </Portal>
  );
};
