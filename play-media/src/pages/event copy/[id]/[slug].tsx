import { FC } from 'react';
import { getAllEvents, getEventById } from '../../../api/queries/getEvents';
import { slugify } from '../../../helpers/slugHelper';
import Head from 'next/head';
import EventDetailsPage from '../../../components/Pages/EventDetailsPage';
import { REVALIDATE_INTERVAL } from '../../../constants/build';

import { identifyVisitor, logViewEvent} from '../../../services/CdpService';

export interface Params {
  id: string;
  slug: string;
  teaser: string;
}

export declare type EventParams = {
  [param: string]: Params;
};

interface Props {
  event: any;
}

const EventDetail: FC<Props> = ({ event }) => {
  if (!event) {
    return (
      <Head>
        <title>Event Detail | PLAY! Media</title>
      </Head>
    );
  }

  logViewEvent({
    page: 'event details page',
    id: event.id,
    title: event.title
  })
 
  return (
    
    <>
      <Head>
        <title>{`${event.title} | PLAY! Media`}</title>
      </Head>
      <EventDetailsPage event={event} />
    </>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  // When this is true (in local or preview environments) don't prerender any static pages
  // (faster builds, but slower initial page load)
  //
  if (process.env.SKIP_BUILD_STATIC_GENERATION === 'false') {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const events = await getAllEvents();
  const validEvents = !events ? [] : events.filter((item) => item);

  const paths = validEvents.map((event) => ({
    params: { id: event?.id, slug: slugify(event?.title || '') },
  }));

  return { paths, fallback: true };
} 

export const getStaticProps = async ({ params }: EventParams) => {
  const event = await getEventById(params.id);

  if (!event) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: REVALIDATE_INTERVAL,
  };
};
