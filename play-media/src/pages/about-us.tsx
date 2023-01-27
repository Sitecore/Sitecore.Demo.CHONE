import Head from 'next/head';
import { getAllContentBlocks } from '../api/queries/getContentBlocks';
import { getAllLocations } from '../api/queries/getLocations';
import { AboutUsPage } from '../components/Pages/AboutUsPage';
import { REVALIDATE_INTERVAL } from '../constants/build';
import { ContentBlock } from '../interfaces/contentBlock';
import { Location } from '../interfaces/location';

export default function AboutUs({
  contentBlocks,
  locations,
}: {
  contentBlocks: ContentBlock[];
  locations: Location[];
}) {
  return (
    <>
      <Head>
        <title>About us | PLAY! Media</title>
      </Head>

      <main>
        <AboutUsPage contentBlocks={contentBlocks} locations={locations} />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const contentBlocks = await getAllContentBlocks();
  const locations = await getAllLocations();

  if (!contentBlocks || !locations) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return {
    props: {
      contentBlocks: contentBlocks,
      locations: locations,
    },
    revalidate: REVALIDATE_INTERVAL,
  };
};
