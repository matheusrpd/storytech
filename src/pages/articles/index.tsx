import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { useAccount } from '../../contexts/AccountContext';
import { getPrismicClient } from '../../services/prismic';

import styles from '../../styles/articles.module.scss';

type Article = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

export default function Articles() {
	const { account } = useAccount();
	const [articles, setArticles] = useState<Article[]>();

	const prismic = getPrismicClient();

	useEffect(() => {
		async function loadArticles() {
			const response = await prismic.query<any>(
				[Prismic.predicates.at('document.type', 'post')],
				{
					fetch: ['post.title', 'post.content'],
					pageSize: 100,
				}
			);

			const articles = response.results.map((article) => {
				return {
					slug: article.uid,
					title: RichText.asText(article.data.title),
					excerpt:
						article.data.content.find((content) => content.type === 'paragraph')
							?.text ?? '',
					updatedAt: new Date(article.last_publication_date).toLocaleDateString(
						'pt-BR',
						{
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						}
					),
				};
			});

			setArticles(articles);
		}

		loadArticles();
	}, [prismic]);

	return (
		<>
			<Head>
				<title>Articles | Storytech</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.articles}>
					{articles?.map((article) => (
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
