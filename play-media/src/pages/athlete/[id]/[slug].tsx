import Head from 'next/head';
import { getAllAthletes, getAthleteById } from '../../../api/queries/getAthletes';
import { getAllEvents } from '../../../api/queries/getEvents';
import { AthleteDetailsPage } from '../../../components/Pages/AthleteDetailsPage';
import { slugify } from '../../../helpers/slugHelper';
import { Athlete } from '../../../interfaces/athlete';
import { Event } from '../../../interfaces/event';
import { useRouter } from 'next/router';
import { FallbackPage } from '../../../components/Pages/FallbackPage';

export interface Params {
  id: string;
  slug: string;
}

export declare type AthleteParams = {
  [param: string]: Params;
};

export default function AthleteDetail({
  athlete,
  athleteEvents,
}: {
  athlete: Athlete;
  athleteEvents: Event[];
}) {
  const router = useRouter();

  // if (router.isFallback) {
  if (true) {
    return <FallbackPage />;
  }

  if (athlete && athleteEvents) {
    return (
      <>
        <Head>
          <title>{`${athlete.athleteName} | PLAY! Media`}</title>
        </Head>
        <AthleteDetailsPage athlete={athlete} athleteEvents={athleteEvents}></AthleteDetailsPage>
      </>
    );
  }

  return null;
}

export async function getStaticPaths() {
  const { athletes } = await getAllAthletes();

  // When this is true (in preview environments) don't prerender any static pages
  // (faster builds, but slower initial page load)
  //
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const paths = athletes.map((athlete) => ({
    params: { id: athlete.id, slug: slugify(athlete.athleteName ?? '') },
  }));

  return { paths, fallback: true };
}

export const getStaticProps = async ({ params }: AthleteParams) => {
  const athlete = (await getAthleteById(params.id)) as Athlete;

  const getAthleteEvents = async (athlete: Athlete) => {
    const events = await getAllEvents();
    const athleteEvents = !events
      ? []
      : events.filter((event: Partial<Event>) =>
          event?.athletes?.results
            .map((athlete: Partial<Athlete>) => athlete.id)
            .includes(athlete.id)
        );

    return athleteEvents as Event[];
  };

  const athleteEvents = athlete?.id ? await getAthleteEvents(athlete) : null;

  // if (!athlete) {
  //   return {
  //     notFound: true,
  //     revalidate: 10,
  //   };
  // }

  return {
    props: {
      athlete,
      athleteEvents,
    },
    revalidate: 10,
  };
};
