import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useSignIn } from '@lib/auth/auth';

function MyApp({ Component, pageProps }: AppProps) {
  useSignIn();

  return (
    <>
      <Head>
        <title>Lyrichords</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
