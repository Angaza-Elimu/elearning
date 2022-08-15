import Head from "next/head";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>New App</title>
        <meta name="description" content="New App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen bg-slate-800 items-center justify-center">
        <h2 className="font-extrabold text-slate-100 text-3xl font-mono">Hello World!</h2>
      </main>
    </div>
  );
}
