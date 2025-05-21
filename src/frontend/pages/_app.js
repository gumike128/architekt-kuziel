import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import Head from 'next/head';
import { AppProvider } from '../contexts/AppProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Architekt kúziel</title>
        <meta name="description" content="Inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Provider store={store}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </>
  );
}

export default MyApp;
