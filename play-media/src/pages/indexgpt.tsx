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

const server = dev ? 'http://localhost:3000/api/sitecoreP' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP';
const server2 = dev ? 'http://localhost:3000/api/sitecoreP2' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP2';
const server3 = dev ? 'http://localhost:3000/api/sitecoreP3' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media-preview.vercel.app/api/sitecoreP3';

console.log (server)
console.log (server2)
console.log (server3)

type PersonalizeAudience = {
  audience?: string;
};


var persoanlize = true

console.log('Fetching real-time data from Sitecore personalize!')
callFlows({ friendlyId: 'homepage_audience' })
.then((response) => {



  var data = JSON.stringify(response);
  console.log("homepage_audience response:" + data)

  var myData = JSON.parse(data);

  console.log(myData.audience)

})
.catch((e) => {
  console.log(e)
})


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
        <title>PLAY! Outfitters</title>
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

  //console.log(response)


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

  console.log("calling the flow")

  //Get Content from Sitecore Personalize

  //***************************************************************** */


  //Get Content from Sitecore Personalize
  //const events = await getAllEvents();

  const events = persoanlize ? await getAllEvents() : await getAllEventsBySport();;

  if (events?.length != 0) {
    const featuredEvents = events?.filter((event) => event.isFeatured)


    // Today
    const date = new Date();
    date.setDate(date.getDate() + 30)

    featuredEvents[0].teaser = rawResult;
    featuredEvents[0].sport.results[0].title = "Hiking and Climbing"
    featuredEvents[0].title = "Trek Epping Forest";

    featuredEvents[0].location = "Epping Forest London";


    date.setDate(date.getDate() + 45)
    featuredEvents[1].title = "Skomer Marine Reserve";

    featuredEvents[1].teaser = rawResult2;
    featuredEvents[1].sport.results[0].title = "Scuba Diving"
    featuredEvents[0].location = "Pembrokeshire, Wales";

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
