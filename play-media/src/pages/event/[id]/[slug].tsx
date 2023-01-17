import { FC } from 'react';
import { getAllEvents, getEventById } from '../../../api/queries/getEvents';
import { slugify } from '../../../helpers/slugHelper';
import Head from 'next/head';
import EventDetailsPage from '../../../components/Pages/EventDetailsPage';

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
  if (event) {
    return (
      <>
        <Head>
          <title>{`${event.title} | PLAY! Media`}</title>
        </Head>
        <EventDetailsPage event={event} />
      </>
    );
  }

  return null;
};

export default EventDetail;

export async function getStaticPaths() {
  const events = await getAllEvents();

  // When this is true (in preview environments) don't prerender any static pages
  // (faster builds, but slower initial page load)
  //
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const paths = !events
    ? []
    : events.map((event) => ({
        params: { id: event.id, slug: slugify(event.title ?? '') },
      }));

  return { paths, fallback: true };
}

export const getStaticProps = async ({ params }: EventParams) => {
  const event = await getEventById(params.id);

  // if (!event) {
  //   return {
  //     notFound: true,
  //     revalidate: 10,
  //   };
  // }

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
};
