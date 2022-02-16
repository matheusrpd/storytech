import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { AccountProvider } from '../contexts/AccountContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AccountProvider>
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</AccountProvider>
	);
}

export default MyApp;
