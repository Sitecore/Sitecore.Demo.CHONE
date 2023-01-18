import { FC } from 'react';
import { Event } from '../../interfaces/event';
import { ShadowBox } from '../Common/ShadowBox';
import { getEventSchedule } from '../../helpers/eventScheduleHelper';
import Link from 'next/link';
import { EVENT_MOCK_IMG } from '../../constants/mockImages';
import { slugify } from '../../helpers/slugHelper';
import { getAccentColor } from '../../helpers/colorHelper';

interface Props {
  event: Event;
}

export const EventCard: FC<Props> = ({ event }) => {
  return (
    <article className="event-card">
      <Link href={`/event/${event?.id}/${slugify(event?.title)}`}>
        <div className="event-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event?.featuredImage?.results[0]?.fileUrl || EVENT_MOCK_IMG}
            alt={event?.featuredImage?.results[0]?.description}
          />
        </div>
        <div className="event-card-content">
          <ShadowBox
            color={getAccentColor(event?.sport?.results[0]?.title)}
            label={event?.sport?.results[0]?.title}
            eyebrow={getEventSchedule(event, true)}
            title={event?.title}
          />
        </div>
      </Link>
    </article>
  );
};
