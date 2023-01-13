import { PropsWithChildren, ReactNode } from "react";
import {
  Modal as PaperModal,
  Portal,
  Text,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { Icon } from "../Icon/Icon";
import { theme } from "../../theme/theme";

interface Props {
  children: PropsWithChildren<ReactNode | ReactNode[]>;
  onDismiss?: () => void;
  visible: boolean;
}

const closeIconStyle = {
  // position: "absolute",
  top: 20,
  right: 20,
  // color: theme.colors.white.DEFAULT,
  // zIndex: 10,
};

export const Modal = ({ children, onDismiss, visible }: Props) => {
  return (
    <Portal>
      <PaperModal
        style={{ justifyContent: "center", alignItems: "center" }}
        visible={visible}
        onDismiss={onDismiss}
      >
        {children}
      </PaperModal>
      <IconButton
        name="close"
        onPress={onDismiss}
        size={50}
        style={closeIconStyle}
      />
    </Portal>
  );
};
