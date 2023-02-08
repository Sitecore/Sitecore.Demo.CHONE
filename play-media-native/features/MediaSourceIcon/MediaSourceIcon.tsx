import { StyleProp } from "react-native";
import { MEDIA_SOURCES } from "../../constants/media";
import { Icon } from "../../components/Icon/Icon";

export const MediaSourceIcon = ({
  size = 20,
  source,
  style,
}: {
  size?: number;
  source: string;
  style?: StyleProp<any>;
}) => {
  if (source === MEDIA_SOURCES.CAMERA) {
    return <Icon name="camera-outline" size={size} style={style} />;
  }

  if (source === MEDIA_SOURCES.LIBRARY) {
    return <Icon name="folder-open-outline" size={size} style={style} />;
  }

  return <Icon name="apps-outline" size={size} style={style} />;
};
