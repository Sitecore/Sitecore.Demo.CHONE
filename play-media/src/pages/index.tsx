import Head from 'next/head';
import { getAllEvents } from '../api/queries/getEvents';
import { EventListingPage } from '../components/Pages/EventListingPage';
import { Event } from '../interfaces/event';
import { REVALIDATE_INTERVAL } from '../constants/build';

export default function Home({ events }: { events: Event[] }) {
  const invalidData = !events;

  return (
    <>
      <Head>
        <title>PLAY! Media</title>
      </Head>

      <main>{invalidData ? null : <EventListingPage events={events} />}</main>
    </>
  );
}

export const getStaticProps = async () => {
  const events = await getAllEvents();

  if (!events) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return {
    props: {
      events,
    },
    revalidate: REVALIDATE_INTERVAL,
  };
};
