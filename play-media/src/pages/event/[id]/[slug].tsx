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
  return (
    <>
      <Head>
        <title>{event.title} | PLAY! Media</title>
      </Head>
      <EventDetailsPage event={event} />
    </>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  const { events } = await getAllEvents();
  const paths = events.map((event) => ({
    params: { id: event.id, slug: slugify(event.title ?? '') },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: EventParams) => {
  const { event } = await getEventById(params.id);

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
};
