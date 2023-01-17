import { FC } from 'react';
import { getAllEvents, getEventById } from '../../../api/queries/getEvents';
import { slugify } from '../../../helpers/slugHelper';
import Head from 'next/head';
import EventDetailsPage from '../../../components/Pages/EventDetailsPage';
import { REVALIDATE_INTERVAL } from '../../../constants/build';

export interface Params {
  id: string;
  slug: string;
}

export declare type EventParams = {
  [param: string]: Params;
};

interface Props {
  event: any;
}

const EventDetail: FC<Props> = ({ event }) => {
  const invalidData = !event;

  return (
    <>
      <Head>
        <title>{`${event.title} | PLAY! Media`}</title>
      </Head>
      {invalidData ? null : <EventDetailsPage event={event} />}
    </>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  // When this is true (in local or preview environments) don't prerender any static pages
  // (faster builds, but slower initial page load)
  //
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const events = await getAllEvents();

  const paths = !events
    ? []
    : events.map((event) => ({
        params: { id: event.id, slug: slugify(event.title ?? '') },
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
