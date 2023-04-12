import Head from 'next/head';
import { getAllEvents } from '../api/queries/getEvents';
import { getAllEventsBySport } from '../api/queries/getEventsBySport';

import { EventListingPage } from '../components/Pages/EventListingPage';
import { Event } from '../interfaces/event';
import { REVALIDATE_INTERVAL } from '../constants/build';

import { identifyVisitor, logViewEvent ,logEvent} from '../services/CdpService';
import MapboxMap from "../components/mapbox/mapbox-map";



export default function Home({ events }: { events: Event[] }) {
  const invalidData = !events;

  return (
    <>
      <Head>
        <title>PLAY! Outfitters</title>
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
