import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import { Media } from '../../interfaces/media';
import ArticleImage from '../ArticleImage/ArticleImage';
import ImageSlide from '../Slider/ImageSlide';
import Slider from '../Slider/Slider';
import SliderModal from '../Slider/SliderModal';

interface Props {
  className?: string;
  images: Partial<Media>[];
}

const ImageGrid: FC<Props> = ({ className, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedSliderImage, setDisplayedSliderImage] = useState<number>(0);
  const handleClick = useCallback((imageIndex: number) => {
    setDisplayedSliderImage(imageIndex);
    setIsModalOpen(true);
  }, []);
  const classes = useMemo(() => {
    const gridClass = images.length > 1 ? 'image-grid' : 'image-single';

    return className ? clsx(gridClass, className) : gridClass;
  }, [className, images.length]);

  return (
    <section className={classes}>
      {images.map((image, index) => (
        <ArticleImage
          key={image.id}
          alt={image.name || ''}
          onClick={() => handleClick(index)}
          src={image.fileUrl || ''}
        />
      ))}
      <SliderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="container">
          <Slider
            autoplay={false}
            className="modal-slider"
            displayedIndex={displayedSliderImage}
            navigation
            showThumb
          >
            {images.map((image) => (
              <ImageSlide
                key={image.id}
                image={{
                  url: image.fileUrl || '',
                  alt: image.name || '',
                }}
              />
            ))}
          </Slider>
        </div>
      </SliderModal>
    </section>
  );
};

export default ImageGrid;
