import Head from 'next/head';
import { AboutUsPage } from '../components/Pages/AboutUsPage';

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About us | PLAY! Media</title>
      </Head>

      <main>
        <AboutUsPage />
      </main>
    </>
  );
}
