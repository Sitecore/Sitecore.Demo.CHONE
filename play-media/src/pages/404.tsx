import Head from 'next/head';
import NotFound404 from '../components/ErrorNotFound404/ErrorNotFound404';

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>404 Not Found | PLAY! Media</title>
      </Head>

      <main>
        <NotFound404 />
      </main>
    </>
  );
}
