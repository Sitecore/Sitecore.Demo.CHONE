import { FC, ReactNode, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

// Swiper modules
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper';

interface Props {
  autoplay?: false | number;
  className?: string;
  children: ReactNode[];
  displayedIndex?: number;
  navigation?: boolean;
  pagination?: boolean;
  showThumb?: boolean;
  spaceBetween?: number;
}

const DEFAULT_THUMB_SLIDE_NUMBER = 4;

const Slider: FC<Props> = ({
  autoplay = false,
  children,
  className,
  displayedIndex = 0,
  navigation = false,
  pagination = false,
  showThumb = false,
  spaceBetween = 10,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const slides = useMemo(
    () => children.map((child, index) => <SwiperSlide key={index}>{child}</SwiperSlide>),
    [children]
  );
  const thumbSlidesPerView =
    children.length < DEFAULT_THUMB_SLIDE_NUMBER ? children.length : DEFAULT_THUMB_SLIDE_NUMBER;
  const thumbSliderWidth = `${thumbSlidesPerView * 25}%`;
  const showNavigation = slides.length > 1;

  if (!showThumb) {
    return (
      <Swiper
        autoplay={!!autoplay ? { delay: autoplay } : false}
        loop
        modules={[Autoplay, FreeMode, Navigation, Pagination]}
        navigation={navigation && showNavigation}
        pagination={pagination}
        spaceBetween={spaceBetween}
        initialSlide={displayedIndex}
        className={className}
      >
        {slides}
      </Swiper>
    );
  }

  return (
    <>
      <Swiper
        loop
        modules={[Autoplay, FreeMode, Navigation, Pagination, Thumbs]}
        navigation={navigation && showNavigation}
        pagination={pagination}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null }}
        initialSlide={displayedIndex}
        className={className}
      >
        {slides}
      </Swiper>
      <Swiper
        loop
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={thumbSlidesPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Autoplay, FreeMode]}
        className="slider-thumb"
        style={{ width: thumbSliderWidth }}
        breakpoints={{
          0: {
            slidesPerView: thumbSlidesPerView - 1,
          },
          768: {
            slidesPerView: thumbSlidesPerView,
          },
        }}
      >
        {slides}
      </Swiper>
    </>
  );
};

export default Slider;
