import Head from 'next/head';
import { getAllEventsBySport } from '../api/queries/getEventsBySport';
import { getAllEvents } from '../api/queries/getEvents';

import { EventListingPage } from '../components/Pages/EventListingPage';
import { Event } from '../interfaces/event';

import { REVALIDATE_INTERVAL } from '../constants/build';
import { Configuration, OpenAIApi } from "openai";
import { useMemo } from 'react';


import { identifyVisitor, logViewEvent } from '../services/CdpService';
import { callFlows, getDynamicWelcomeMessage, getGuestRef } from '../services/BoxeverService';
import { truncate } from 'fs';

const logEvent = (id, eventType) => {
  logViewEvent({ type: eventType, ext: { contentHubID: id } })
}

const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:3000/api/azure' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/azure';
const server2 = dev ? 'http://localhost:3000/api/azure2' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/azure2';

var persoanlize = false



export default function Home({ events }: { events: Event[] }) {



callFlows({ friendlyId: 'homepage_audience' })
.then((response) => {

  var data = JSON.stringify(response);
  //console.log("homepage_audience response:" + data)
  var myData = JSON.parse(data);
  console.log(myData.audience)

  myData.audience = "default"? persoanlize=false : persoanlize = true;

})
.catch((e) => {
  console.log(e)
})
  const invalidData = !events;
  logViewEvent({ page: 'homepage' })

  return (
    <>
      <Head>
        <title>PLAY! Outfitters</title>
      </Head>
      <main>{invalidData ? null : <EventListingPage events={events} />}</main>
    </>
  );
}

export const getServerSideProps = async () => {

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

  const data = await response.json();
  const data2 = await response2.json();


  let rawResult = data.result;
  let rawResult2 = data2.result;

  //console.log('The raw result from the Azure Open AI call is ' + rawResult)


  //console.log("calling the flow")


  const events = persoanlize ? await getAllEventsBySport() : await getAllEvents();

  if (events?.length != 0) {
    const featuredEvents = events?.filter((event) => event.isFeatured)

    console.log('featured events are :' + featuredEvents[0].teaser)


    // Today
    const date = new Date();
    date.setDate(date.getDate() + 30)

    featuredEvents[0].teaser = rawResult;
    featuredEvents[0].sport.results[0].title = "Yoga"
    featuredEvents[0].title = "Relax in Epping Forest";

    featuredEvents[0].location = "Epping Forest London";

    date.setDate(date.getDate() + 45)
    featuredEvents[1].title = "Epping Forst Hike";

    featuredEvents[1].teaser = rawResult2;
    featuredEvents[1].sport.results[0].title = "Hiking"
    featuredEvents[1].location = "Pembrokeshire, Wales";

  }

  if (!events) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      events,
    },
  };
};
