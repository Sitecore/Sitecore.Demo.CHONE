import Head from 'next/head';
import { getAllEvents } from '../api/queries/getEvents';
import { EventListingPage } from '../components/Pages/EventListingPage';
import { Event } from '../interfaces/event';

export default function Home({ events }: { events: Event[] }) {
  return (
    <>
      <Head>
        <title>PLAY! Media</title>
      </Head>

      <main>
        <EventListingPage events={events} />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const { events } = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 10,
  };
};
