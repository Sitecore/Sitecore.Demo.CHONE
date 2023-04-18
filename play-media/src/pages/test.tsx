import Image from 'next/image';
import { FC } from 'react';
import { getSlideImageSize } from '../helpers/imageHelper';

interface Props {
  image: {
    alt: string;
    url: string;
  };
}

const ImageSlide: FC<Props> = ({ image }) => {
  return (
    <div>
      <Image
        fill
        style={{ objectFit: 'contain' }}
        sizes={getSlideImageSize()}
        src='/map.png'
        alt={'map'}
      />
    </div>
  );
};

export default ImageSlide;