import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import AppProvider from '../contexts/AppProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
