import { FC } from 'react';
import { getAllEvents, getEventById } from '../../../api/queries/getEvents';
import { slugify } from '../../../helpers/slugHelper';
import Head from 'next/head';
import EventDetailsPage from '../../../components/Pages/EventDetailsPage';
import { REVALIDATE_INTERVAL } from '../../../constants/build';

import { identifyVisitor, logViewEvent, logEvent} from '../../../services/CdpService';

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

  logEvent("ARTICLE_READ",{
    page: 'event details page',
    ext: {
      name: event.sport.results[0].title,
      AIgenerated: false
    }
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

// Begin of Change for Demo
// ***** Removed the static generation of events pages in order to work with S Personalize and CDP more effectively.
// End of Change for Demo

/*export async function getStaticPaths() {
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
} */

export const getServerSideProps  = async ({ params }: EventParams) => {

  console.log("The event to fetch is :" + params.id)
  const event = await getEventById(params.id);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
  };
};
