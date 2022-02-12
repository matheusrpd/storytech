import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { AccountProvider } from '../contexts/AccountContext';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AccountProvider>
			<Header />
			<Component {...pageProps} />
		</AccountProvider>
	);
}

export default MyApp;
