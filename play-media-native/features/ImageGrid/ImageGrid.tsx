import { useCallback, useMemo } from "react";
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { theme } from "../../theme/theme";

export const ImageGrid = ({
  images,
  onImagePress,
  style,
}: {
  images: string[];
  onImagePress: (i: number) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const width = Dimensions.get("window").width;
  const oneThird = (width - 2 * theme.spacing.sm) / 3;
  const twoThirds = 2 * oneThird;

  const styles = StyleSheet.create({
    row: {
      flexWrap: "wrap",
      flexDirection: "row",
    },
    reverseRow: {
      flexWrap: "wrap",
      flexDirection: "row-reverse",
    },
    largeSquare: {
      width: twoThirds,
      height: twoThirds,
    },
    smallSquare: {
      width: oneThird,
      height: oneThird,
    },
    tallRectangle: {
      width: oneThird,
      height: twoThirds,
    },
    wideRectangle: {
      width: twoThirds,
      height: oneThird,
    },
  });

  const getImageStyle = useCallback((i: number) => {
    return i === 0
      ? styles.largeSquare
      : i === 1
      ? styles.tallRectangle
      : i === 2
      ? styles.smallSquare
      : styles.wideRectangle;
  }, []);

  const getRowStyle = useCallback(
    (i: number) => ((i + 1) % 2 ? styles.row : styles.reverseRow),
    []
  );

  const imageRows = useMemo(() => {
    return images.reduce((result, item, index) => {
      const perChunk = 4;
      const chunkIndex = Math.floor(index / perChunk);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(item);

      return result;
    }, []);
  }, [images]);

  return (
    <View style={style}>
      {imageRows.map((images: string[], i: number) => {
        return (
          <View style={getRowStyle(i)} key={i}>
            {images.map((img: string, i: number) => {
              return (
                <Pressable onPress={() => onImagePress(i)} key={`${img}${i}`}>
                  <Image source={{ uri: img }} style={getImageStyle(i)} />
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
