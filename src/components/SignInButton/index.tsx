import { FaWallet } from 'react-icons/fa';
import { useAccount } from '../../contexts/AccountContext';
import { formatAddressWallet } from '../../utils/formatAddressWallet';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

interface SignInButtonProps {
	handleSignIn: () => void;
	handleSignOut: () => void;
}

export function SignInButton({
	handleSignIn,
	handleSignOut,
}: SignInButtonProps) {
	const { account, isAuthenticated } = useAccount();

	return isAuthenticated ? (
		<button
			type="button"
			className={styles.signInButton}
			onClick={handleSignOut}
		>
			<FaWallet color="#eba417" />
			{formatAddressWallet(account.address)}
			<FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button
			type="button"
			className={styles.signInButton}
			onClick={handleSignIn}
		>
			<FaWallet color="#eba417" />
			Connect to MetaMask
		</button>
	);
}
