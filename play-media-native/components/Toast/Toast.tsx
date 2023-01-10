import { useMemo } from "react";
import { Snackbar, Text } from "react-native-paper";
import { Icon } from "../Icon/Icon";
import { View } from "react-native";

// export enum ToastType {
//   "error" = "error",
//   "info" = "info",
//   "success" = "success",
//   "warning" = "warning",
// }

interface Props {
  actionLabel?: string;
  duration?: number;
  message: string;
  onAction?: () => void;
  onDismiss?: () => void;
  type: "error" | "info" | "warning" | "success";
  visible: boolean;
}

const defaultInterval = 3000;

const iconStyle = {
  marginRight: 10,
};

export const Toast = ({
  actionLabel,
  duration,
  message,
  onAction,
  onDismiss,
  type,
  visible,
}: Props) => {
  const icon = useMemo(() => {
    if (type === "info") {
      return (
        <Icon
          color="white"
          name="information-circle-outline"
          style={iconStyle}
        />
      );
    }

    if (type === "error") {
      return <Icon name="close-circle-outline" color="red" style={iconStyle} />;
    }

    if (type === "success") {
      return (
        <Icon name="checkmark-circle-outline" color="green" style={iconStyle} />
      );
    }

    if (type === "warning") {
      return <Icon name="warning-outline" color="yellow" style={iconStyle} />;
    }

    return null;
  }, []);

  const displayedMessage = useMemo(
    () => (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {icon}
        <Text style={{ color: "white" }}>{message}</Text>
      </View>
    ),
    []
  );

  return (
    <Snackbar
      action={{
        label: actionLabel,
        onPress: onAction,
      }}
      duration={duration || defaultInterval}
      onDismiss={onDismiss}
      visible={visible}
    >
      {displayedMessage}
    </Snackbar>
  );
};
