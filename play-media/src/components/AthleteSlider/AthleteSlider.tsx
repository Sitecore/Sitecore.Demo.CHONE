import { Athlete } from '../../interfaces/athlete';
import { AthleteSliderCard } from './AthleteSliderCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export const AthleteSlider = ({ athletes }: { athletes: Athlete[] }) => {
  // there's a weird bug when slides are too few
  const slides = athletes.length <= 3 ? [...athletes, ...athletes] : [...athletes];

  //TODO: come up with a solution for only one slide

  return (
    <section className="athlete-slider">
      <Swiper
        slidesPerView={'auto'}
        loop={true}
        centeredSlides={true}
        slidesOffsetBefore={0}
        spaceBetween={50}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay]}
      >
        {slides.map((slide, key) => (
          <SwiperSlide key={`${slide.id}${key}`}>
            <AthleteSliderCard athlete={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
