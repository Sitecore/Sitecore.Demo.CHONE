import Image from 'next/image';
import { FC } from 'react';

interface Props {
  image: {
    alt: string;
    url: string;
  };
}

const ImageSlide: FC<Props> = ({ image }) => {
  return (
    <div>
      <Image fill style={{ objectFit: 'contain' }} src={image?.url || ''} alt={image?.alt || ''} />
    </div>
  );
};

export default ImageSlide;
