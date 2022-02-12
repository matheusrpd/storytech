import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from '../../../contexts/AccountContext';

import styles from '../../../styles/article.module.scss';

type Article = {
	slug: string;
	title: string;
	content: string;
	updatedAt: string;
};

export default function ArticlePreview() {
	const { account, isAuthenticated } = useAccount();
	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		if (isAuthenticated && account?.subscriber) {
			router.push(`/articles/${slug}`);
		}
	}, [account, isAuthenticated, router, slug]);

	const [article, setArticle] = useState<Article>({
		slug: 'nextjs-novidades-na-versao-10',
		title: 'NextJS: Novidades na versão 10',
		content:
			'Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode. Na semana passada aconteceu a Next.js Conf. Uma das surpresas foi o anúncio da versão 10, com várias melhorias. Vamos experimentar algumas dessas melhorias e aplicar na prática no blog que criamos para ir evoluindo com essa ferramenta que tem revolucionado a web',
		updatedAt: new Date(Date.now()).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}),
	});

	return (
		<>
			<Head>
				<title>{article.title} | Storytech</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.article}>
					<h1>{article.title}</h1>
					<time>{article.updatedAt}</time>
					<div
						className={`${styles.content} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>

					<div className={styles.continueReading}>
						Wanna continue reading?
						<Link href="/">
							<a>Subscribe now 🤗</a>
						</Link>
					</div>
				</article>
			</main>
		</>
	);
}
