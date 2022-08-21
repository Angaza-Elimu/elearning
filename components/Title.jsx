import Head from "next/head";

export default function Title({ children, name }) {
  return (
    <Head>
      <title>{`E-learning ${name && `- ${name}`}`}</title>
      {children}
    </Head>
  );
}
