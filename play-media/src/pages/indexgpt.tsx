import Head from 'next/head';
import { getAllEvents } from '../api/queries/getEvents';

import { EventListingPage } from '../components/Pages/EventListingPage';
import { Event } from '../interfaces/event';
import { REVALIDATE_INTERVAL } from '../constants/build';
import { Configuration, OpenAIApi } from "openai";
import { useMemo } from 'react';


import { identifyVisitor, logViewEvent ,logEvent} from '../services/CdpService';

const dev = process.env.NODE_ENV !== 'development';

const server = dev ? 'http://localhost:3000/api/sitecoreP' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP';
const server2 = dev ? 'http://localhost:3000/api/sitecoreP2' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP2';
const server3 = dev ? 'http://localhost:3000/api/sitecoreP3' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP3';

console.log (server)
console.log (server2)
console.log (server3)


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home({ events }: { events: Event[] }) {
  const invalidData = !events;
  logViewEvent({ page: 'homepage' })

  return (
    <>
      <Head>
        <title>PLAY! Travel</title>
      </Head>
      <main>{invalidData ? null : <EventListingPage events={events} />}</main>
    </>
  );
}

export const getStaticProps = async () => {

  const response = await fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: "" }),
  });


  const response2 = await fetch(server2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: "" }),
  });


  const response3 = await fetch(server3, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: "" }),
  });

  const data = await response.json();
  const data2 = await response2.json();
  const data3 = await response3.json();

  let rawResult = data.result;
  let rawResult2 = data2.result;
  let rawResult3 = data3.result;

  const events = await getAllEvents();

if (events?.length != 0) {
  const featuredEvents = events?.filter((event) => event.isFeatured)

  featuredEvents[0].teaser = rawResult;
  featuredEvents[0].sport.results[0].title = "Hiking"
  featuredEvents[0].title = "Your Dream Hike";
  featuredEvents[0].timeAndDate = null;


  featuredEvents[1].title = "Diving Adventure";
  featuredEvents[1].timeAndDate = null;
  featuredEvents[1].teaser = rawResult2;
  featuredEvents[1].sport.results[0].title = "Scuba Diving"

}

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
