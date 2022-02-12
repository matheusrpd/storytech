import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '../../contexts/AccountContext';

import styles from '../../styles/articles.module.scss';

type Article = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

export default function Articles() {
	const { account } = useAccount();

	const [articles, setArticles] = useState<Article[]>([
		{
			slug: 'nextjs-novidades-na-versao-10',
			title: 'NextJS: Novidades na versão 10',
			excerpt:
				'Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode.',
			updatedAt: new Date(Date.now()).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		},
	]);

	return (
		<>
			<Head>
				<title>Articles | Storytech</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.articles}>
					{articles.map((article) => (
						<Link
							href={
								account?.subscriber
									? `/articles/${article.slug}`
									: `/articles/preview/${article.slug}`
							}
							key={article.slug}
						>
							<a>
								<time>{article.updatedAt}</time>
								<strong>{article.title}</strong>
								<p>{article.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}
