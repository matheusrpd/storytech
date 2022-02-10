import { FaWallet } from 'react-icons/fa';

import styles from './styles.module.scss';

export function SignInButton() {
	// const [session] = useSession();

	// return session ? (
	// <button
	// 	type="button"
	// 	className={styles.signInButton}
	// 	// onClick={() => signOut()}
	// >
	// 	<FaGithub color="#04d361" />
	// 	{session.user.name}
	// 	<FiX color="#737380" className={styles.closeIcon} />
	// </button>;
	// ) : (
	return (
		<button
			type="button"
			className={styles.signInButton}
			// onClick={() => signIn('github')}
		>
			<FaWallet color="#eba417" />
			Connect to MetaMask
		</button>
	);
	// );
}
