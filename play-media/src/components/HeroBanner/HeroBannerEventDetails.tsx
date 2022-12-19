import { EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getEventSchedule } from '../../helpers/eventScheduleHelper';
import { Event } from '../../interfaces/event';
import { ShadowBox } from '../Common/ShadowBox';
import { HeroBanner } from './HeroBanner';

export const HeroBannerEventDetails = ({ event }: { event: Event }) => {
  return (
    <HeroBanner
      imageSrc={event?.featuredImage?.results[0]?.fileUrl || EVENT_MOCK_IMG}
      className="hero-banner-event-details"
    >
      <ShadowBox
        color={event?.sport?.results[0]?.color}
        label={event?.sport?.results[0]?.title}
        eyebrow={getEventSchedule(event)}
        title={event?.title}
        labelLink={`/sport/${event?.sport?.results[0]?.title?.toLowerCase()}`}
      />
    </HeroBanner>
  );
};
