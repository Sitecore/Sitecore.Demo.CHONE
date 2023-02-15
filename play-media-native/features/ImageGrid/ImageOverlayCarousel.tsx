import { Dimensions, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Modal, Portal } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

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
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    visibilityStyle: {
      display: visible ? 'flex' : 'none',
    },
  });

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <GestureHandlerRootView>
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
                  style={{
                    height,
                    width,
                    resizeMode: 'contain',
                  }}
                />
              );
            }}
          />
        </GestureHandlerRootView>
        <IconButton
          icon="close"
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            ...styles.visibilityStyle,
          }}
        />
      </Modal>
    </Portal>
  );
};
