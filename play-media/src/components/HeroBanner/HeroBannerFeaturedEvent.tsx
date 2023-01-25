import Link from 'next/link';
import { EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor } from '../../helpers/colorHelper';
import { getEventSchedule } from '../../helpers/eventScheduleHelper';
import { slugify } from '../../helpers/slugHelper';
import { Event } from '../../interfaces/event';
import { ShadowBox } from '../Common/ShadowBox';
import { HeroBanner } from './HeroBanner';

export const HeroBannerFeaturedEvent = ({ event }: { event: Event }) => {
  return (
    <HeroBanner
      imageSrc={event?.featuredImage?.results[0]?.fileUrl || EVENT_MOCK_IMG}
      className="hero-banner-featured-event"
    >
      <Link href={`event/${event.id}/${slugify(event?.title)}`}>
        <ShadowBox
          color={getAccentColor(event?.sport?.results[0]?.title)}
          label={event?.sport?.results[0]?.title}
          eyebrow={getEventSchedule(event)}
          title={event?.title}
          body={event?.teaser}
        />
      </Link>
    </HeroBanner>
  );
};
