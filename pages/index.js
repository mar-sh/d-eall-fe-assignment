import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>B3K3N</title>
        <meta name="description" content="Browse books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold  text-red-800">Home page</h1>
      </main>
    </div>
  );
}
