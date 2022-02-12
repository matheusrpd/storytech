import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from '../styles/home.module.scss';

const priceSubscriber = 100000000000000000 * 5; // 0,5 ether

export default function Home() {
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
