import Head from 'next/head';
import { getAllAthletes } from '../api/queries/getAthletes';
import { getAllSports } from '../api/queries/getSports';
import { AthleteListingPage } from '../components/Pages/AthleteListingPage';
import { Athlete } from '../interfaces/athlete';
import { Sport } from '../interfaces/sport';
import { REVALIDATE_INTERVAL } from '../constants/build';

export default function Athletes({ athletes, sports }: { athletes: Athlete[]; sports: Sport[] }) {
  const invalidData = !athletes || !sports;

  return (
    <>
      <Head>
        <title>Athletes | PLAY! Media</title>
      </Head>

      <main>{invalidData ? null : <AthleteListingPage athletes={athletes} sports={sports} />}</main>
    </>
  );
}

export const getStaticProps = async () => {
  const athletesPromise = getAllAthletes();
  const sportsPromise = getAllSports();

  await Promise.all([athletesPromise, sportsPromise]);

  const athletes = await getAllAthletes();
  const sports = await getAllSports();

  if (!athletes || !sports) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return {
    props: {
      sports,
      athletes: athletes.sort((a, b) => a.athleteName!.localeCompare(b.athleteName!)),
    },
    revalidate: REVALIDATE_INTERVAL,
  };
};
