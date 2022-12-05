import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Play! Media</title>
        <meta
          name="description"
          content="Play! Media - A Contenthub One Demo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to Play! Media</h1>
      </main>
    </div>
  );
}
