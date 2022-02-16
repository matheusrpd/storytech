import Head from 'next/head';
import { useEffect } from 'react';
import { SubscribeButton } from '../components/SubscribeButton';
import { useAccount } from '../contexts/AccountContext';
import { contractStoryTech } from '../services/web3';
import { toast } from 'react-toastify';

import styles from '../styles/home.module.scss';
import { formatAddressWallet } from '../utils/formatAddressWallet';

const priceSubscriber = 100000000000000000 * 5; // 0,5 ether

export default function Home() {
	const { account } = useAccount();

	useEffect(() => {
		contractStoryTech
			.getPastEvents('eventSubscriptionExpiring', {
				fromBlock: 0,
				toBlock: 'latest',
			})
			.then((result) => {
				result.forEach((item) => {
					if (
						String(item.returnValues._address).toLocaleLowerCase() ===
						account?.address.toLocaleLowerCase()
					) {
						toast.warn(
							`${formatAddressWallet(
								account.address
							)} sua assinatura expirará em 3 dias!`,
							{
								position: 'top-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							}
						);
					}
				});
			});

		// contractStoryTech.events.eventSubscriptionExpiring((error, event) =>
		// 	console.log(event)
		// );
	}, [account]);

	return (
		<>
			<Head>
				<title>Home | Storytech</title>
			</Head>

			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>👏 Hey, welcome</span>
					<h1>
						News about the <span>tech</span> world.
					</h1>
					<p>
						Get acess to all publications <br />
						<span>for 0.5 ether month</span>
					</p>
					<SubscribeButton price={priceSubscriber} />
				</section>

				<img src="/images/avatar.svg" alt="Girl coding" />
			</main>
		</>
	);
}
