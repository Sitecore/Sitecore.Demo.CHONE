import { Parallax } from 'react-parallax';
import { EVENT_MOCK_IMG } from '../../constants/mockImages';

export type HeroBannerProps = {
  imageSrc: string | undefined;
  children?: React.ReactNode;
  className?: string;
};

export const HeroBanner = ({ imageSrc, className, children }: HeroBannerProps) => {
  return (
    <Parallax blur={0} bgImage={imageSrc || EVENT_MOCK_IMG} bgImageAlt="event image" strength={200}>
      <section className={`hero-banner ${className}`}>
        <div className="hero-banner-content">{children}</div>
      </section>
    </Parallax>
  );
};
