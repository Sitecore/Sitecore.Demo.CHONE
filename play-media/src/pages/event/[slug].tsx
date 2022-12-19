import { FC } from 'react';
import { getAllEvents } from '../../api/queries/getEvents';
import { RichText } from '../../components/RichText/RichText';
import { EventGridSimple } from '../../components/EventGrid/EventGridSimple';
import { HeroBannerEventDetails } from '../../components/HeroBanner/HeroBannerEventDetails';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import { Event } from '../../interfaces/event';
import { AthleteGrid } from '../../components/AthleteGrid/AthleteGrid';

export interface Params {
  slug: string;
}

export declare type EventParams = {
  [param: string]: Params;
};

interface Props {
  event: any;
}

const EventDetail: FC<Props> = ({ event }) => {
  return (
    <main>
      <HeroBannerEventDetails event={event} />
      <div className="container content-section event-detail-content">
        {!!event?.relatedMedia?.results?.length && (
          <ImageGrid images={event?.relatedMedia?.results || []} />
        )}
        <RichText body={event.body.content} />
      </div>
      {!!event?.athletes?.results && (
        <section>
          <h2 className="text-center -mb-10">Athletes who will join</h2>
          <AthleteGrid athletes={event.athletes.results} />
        </section>
      )}
      {!!event?.similarEvents?.results?.length && (
        <section>
          <h2 className="text-center mb-10">Similar events</h2>
          <EventGridSimple events={event.similarEvents.results as Event[]} />
        </section>
      )}
    </main>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  const { events } = await getAllEvents();
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: EventParams) => {
  const { events } = await getAllEvents();

  return {
    props: {
      event: events.find((event) => event.slug === params.slug),
    },
    revalidate: 10,
  };
};
