import { useAccount } from '../../contexts/AccountContext';
import { contractStoryTech } from '../../utils/web3';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
	price: number;
}

export function SubscribeButton({ price }: SubscribeButtonProps) {
	const { account, updateAccount } = useAccount();

	async function handleSubscribe() {
		try {
			await contractStoryTech.methods.signature().send({
				from: account.address,
				value: price,
			});

			updateAccount({
				address: account.address,
				subscriber: true,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<button
			type="button"
			className={styles.subscribeButton}
			onClick={handleSubscribe}
			disabled={account.subscriber}
		>
			{account?.subscriber ? 'Subscriber' : 'Subscribe now'}
		</button>
	);
}
