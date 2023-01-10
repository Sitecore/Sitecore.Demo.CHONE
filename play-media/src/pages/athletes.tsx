import Head from 'next/head';
import { getAllAthletes } from '../api/queries/getAthletes';
import { getAllSports } from '../api/queries/getSports';
import { AthleteListingPage } from '../components/Pages/AthleteListingPage';
import { Athlete } from '../interfaces/athlete';
import { Sport } from '../interfaces/sport';

export default function Athletes({ athletes, sports }: { athletes: Athlete[]; sports: Sport[] }) {
  return (
    <>
      <Head>
        <title>Athletes | PLAY! Media</title>
      </Head>

      <main>
        <AthleteListingPage athletes={athletes} sports={sports} />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const { athletes } = await getAllAthletes();
  const { sports } = await getAllSports();

  return {
    props: {
      athletes,
      sports,
    },
    revalidate: 10,
  };
};
