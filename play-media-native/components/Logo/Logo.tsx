import { Image, ImageStyle } from 'react-native';

export const Logo = ({ style }: { style?: ImageStyle }) => {
  return (
    <Image
      style={{
        height: 35,
        width: 200,
        ...style,
      }}
      source={require('../../assets/play-media-logo.png')}
    />
  );
};
