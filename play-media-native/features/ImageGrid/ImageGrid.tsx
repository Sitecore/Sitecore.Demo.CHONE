import { useCallback, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { ImageGridLayout } from './ImageGridLayout';
import { ImageOverlayCarousel } from './ImageOverlayCarousel';

export const ImageGrid = ({
  images,
  style,
}: {
  images: string[];
  style?: StyleProp<ViewStyle>;
}) => {
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const onOverlayClose = useCallback(() => {
    setOverlayVisible(false);
  }, []);

  const onImagePress = useCallback((i: number) => {
    setCarouselStartIndex(i);
    setOverlayVisible(true);
  }, []);

  return (
    <View style={style}>
      <ImageGridLayout images={images} onImagePress={onImagePress} />
      <ImageOverlayCarousel
        images={images}
        startIndex={carouselStartIndex}
        visible={overlayVisible}
        onClose={onOverlayClose}
      />
    </View>
  );
};
