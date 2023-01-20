import { Dimensions, Image, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { IconButton } from "react-native-paper";
import { theme } from "../../theme/theme";

export const ImageOverlayCarousel = ({
  images,
  startIndex = 0,
  visible,
  onClose,
}: {
  images: string[];
  startIndex?: number;
  visible: boolean;
  onClose: () => void;
}) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    visibilityStyle: {
      display: visible ? "flex" : "none",
    },
  });

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: theme.colors.black.transluscent,
        ...styles.visibilityStyle,
      }}
    >
      <Carousel
        loop
        width={width}
        height={height}
        data={images}
        defaultIndex={startIndex}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item }}
              style={{ height: height, width: width, resizeMode: "contain" }}
            />
          );
        }}
      />
      <IconButton
        icon="close"
        onPress={onClose}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          ...styles.visibilityStyle,
        }}
      />
    </View>
  );
};
