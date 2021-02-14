import { ProviderAuth } from '../lib/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <Component {...pageProps} />
    </ProviderAuth>
  );
}

export default MyApp;
