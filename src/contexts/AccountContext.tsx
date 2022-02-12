declare let window: any;

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

import { web3, contractStoryTech } from '../services/web3';

type Account = {
	address: string;
	subscriber: boolean;
};

type AccountContextData = {
	signIn: () => Promise<void>;
	signOut: () => void;
	updateAccount: (account: Account) => void;
	isAuthenticated: boolean;
	account: Account | null;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AccountContext = createContext({} as AccountContextData);

export function AccountProvider({ children }: AuthProviderProps) {
	const [account, setAccount] = useState<Account | null>(() => {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem('storytech.account');

			const account = JSON.parse(data);

			return account;
		}
	});

	const isAuthenticated = !!account;

	useEffect(() => {
		window.ethereum.on('accountsChanged', async (accounts: string[]) => {
			if (typeof window !== 'undefined') {
				const updatedAccount = {
					address: accounts[0],
					subscriber: await isSubscriber(accounts[0]),
				};

				localStorage.setItem(
					'storytech.account',
					JSON.stringify(updatedAccount)
				);

				setAccount(updatedAccount);
			}
		});
	}, []);

	async function signIn() {
		const accounts = await web3.eth.requestAccounts();

		if (typeof window !== 'undefined') {
			const updatedAccount = {
				address: accounts[0],
				subscriber: await isSubscriber(accounts[0]),
			};

			localStorage.setItem('storytech.account', JSON.stringify(updatedAccount));

			setAccount(updatedAccount);
		}
	}

	function signOut(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('storytech.account');
		}

		setAccount(null);
	}

	async function updateAccount(account: Account) {
		setAccount(account);
	}

	async function isSubscriber(address: string) {
		let response = false;

		try {
			response = await contractStoryTech.methods
				.getSignatureValid()
				.call({ from: address });
		} catch (err) {
			return response;
		}

		return response;
	}

	return (
		<AccountContext.Provider
			value={{
				signIn,
				signOut,
				updateAccount,
				isAuthenticated,
				account,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}

export const useAccount = () => useContext(AccountContext);
