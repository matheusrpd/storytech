import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<h1 className={styles.logo}>
					Story<span>tech</span>
				</h1>

				<nav>
					<ActiveLink activeClassName={styles.active} href="/">
						<a>Home</a>
					</ActiveLink>
					<ActiveLink activeClassName={styles.active} href="/articles">
						<a>Articles</a>
					</ActiveLink>
				</nav>

				<SignInButton />
			</div>
		</header>
	);
}
