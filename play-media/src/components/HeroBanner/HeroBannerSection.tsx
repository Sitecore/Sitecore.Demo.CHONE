import { FC, ReactNode } from 'react';
import { HeroBanner, HeroBannerProps } from './HeroBanner';

type HeroBannerSectionProps = HeroBannerProps & {
  title: string;
  body?: ReactNode;
};

export const HeroBannerSection = ({
  imageSrc,
  className,
  title,
  body,
  children,
}: HeroBannerSectionProps) => {
  return (
    <HeroBanner
      imageSrc={imageSrc}
      className={`hero-banner-section ${!!className ? className : ''}`}
    >
      <div className="hero-banner-section-content">
        <h1>{title}</h1>
        <div className="hero-banner-section-content-body richtext">{body}</div>
      </div>
      {children}
    </HeroBanner>
  );
};
