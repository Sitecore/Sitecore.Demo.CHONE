import Image from 'next/image';
import { FC } from 'react';
import { getSlideImageSize } from '../helpers/imageHelper';
import MapboxMap from "../components/mapbox/mapbox-map";


interface Props {
  image: {
    alt: string;
    url: string;
  };
}

const ImageSlide: FC<Props> = ({ image }) => {
  return (
    <>
<section>

  <h1>

    map
  </h1>
  <p>ajdasdf</p>
  <p>ajdasdf</p>
  <p>ajdasdf</p>
  <MapboxMap/>
</section>
    
    </>
  );
};

export default ImageSlide;