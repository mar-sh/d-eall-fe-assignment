import Head from "next/head";
import HeroSection from "../components/heroSection.js";

export default function Home() {
  return (
    <div className="min-h-screen bg-white-100">
      <Head>
        <title>B3K3N</title>
        <meta name="description" content="Browse books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSection />
      </main>
    </div>
  );
}
