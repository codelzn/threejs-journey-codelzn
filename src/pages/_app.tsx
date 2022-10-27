import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Threejs-journey-codelzn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
