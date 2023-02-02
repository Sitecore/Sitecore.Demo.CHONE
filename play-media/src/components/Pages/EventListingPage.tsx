import { useMemo } from 'react';
import { Event } from '../../interfaces/event';
import { EventGrid } from '../EventGrid/EventGrid';
import { HeroBannerFeaturedEvent } from '../HeroBanner/HeroBannerFeaturedEvent';
import Slider from '../Slider/Slider';

export const EventListingPage = ({ events }: { events: Event[] }) => {
  const featuredEvents = useMemo(
    () => (!events ? [] : events.filter((event) => event.isFeatured)),
    [events]
  );

  const featuredBanner = useMemo(() => {
    if (!events) {
      return null;
    }

    if (featuredEvents.length === 0) {
      return <HeroBannerFeaturedEvent event={events[0]} />;
    }

    if (featuredEvents.length === 1) {
      return <HeroBannerFeaturedEvent event={featuredEvents[0]} />;
    }

    return (
      <Slider
        autoplay={5000}
        spaceBetween={0}
        className="hero-banner-slider"
        pagination={{
          clickable: true,
          el: '.hero-pagination-inner',
          type: 'bullets',
        }}
        paginationContainer={
          <div className="hero-pagination">
            <div className="hero-pagination-inner"></div>
          </div>
        }
      >
        {featuredEvents.map((event) => (
          <HeroBannerFeaturedEvent key={event.id} event={event} />
        ))}
      </Slider>
    );
  }, [featuredEvents, events]);

  return (
    <>
      {featuredBanner}
      <EventGrid events={events} />
    </>
  );
};
