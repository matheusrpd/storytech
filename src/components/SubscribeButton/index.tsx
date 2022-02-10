import styles from './styles.module.scss';

interface SubscribeButtonProps {
	price: number;
}

export function SubscribeButton({ price }: SubscribeButtonProps) {
	async function handleSubscribe() {}

	return (
		<button
			type="button"
			className={styles.subscribeButton}
			onClick={handleSubscribe}
		>
			Subscribe now
		</button>
	);
}
