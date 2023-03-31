import { useCallback, useMemo } from 'react';
import { Dimensions, Image, View, StyleSheet, Pressable } from 'react-native';

export const ImageGridLayout = ({
  images,
  onImagePress,
}: {
  images: string[];
  onImagePress: (i: number) => void;
}) => {
  const width = Dimensions.get('window').width;
  const oneThird = width / 3;
  const twoThirds = 2 * oneThird;
  const imagesPerRow = 4;

  const styles = StyleSheet.create({
    row: {
      flexWrap: 'wrap',
      flexDirection: 'row',
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

  const getImageStyle = useCallback(
    (i: number) => {
      return i === 0
        ? styles.largeSquare
        : i === 1
        ? styles.tallRectangle
        : i === 2
        ? styles.smallSquare
        : styles.wideRectangle;
    },
    [styles.largeSquare, styles.smallSquare, styles.tallRectangle, styles.wideRectangle]
  );

  const imageRows = useMemo(() => {
    return images.reduce((result, item, index) => {
      const rowIndex = Math.floor(index / imagesPerRow);

      if (!result[rowIndex]) {
        result[rowIndex] = [];
      }

      result[rowIndex].push(item);

      return result;
    }, []);
  }, [images]);

  return (
    <View>
      {imageRows.map((images: string[], rowIndex: number) => {
        return (
          <View style={styles.row} key={rowIndex}>
            {images.map((img: string, imageIndex: number) => {
              return (
                <Pressable
                  onPress={() => onImagePress(rowIndex * imagesPerRow + imageIndex)}
                  key={`${img}${imageIndex}`}
                >
                  <Image source={{ uri: img }} style={getImageStyle(imageIndex)} />
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
