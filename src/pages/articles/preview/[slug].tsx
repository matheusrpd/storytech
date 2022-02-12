import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect, useState } from 'react';
import { useAccount } from '../../../contexts/AccountContext';
import { getPrismicClient } from '../../../services/prismic';

import styles from '../../../styles/article.module.scss';

type Article = {
	slug: string | string[];
	title: string;
	content: string;
	updatedAt: string;
};

export default function ArticlePreview() {
	const { account, isAuthenticated } = useAccount();
	const [article, setArticle] = useState<Article>();
	const router = useRouter();
	const { slug } = router.query;

	const prismic = getPrismicClient();

	useEffect(() => {
		if (isAuthenticated && account?.subscriber) {
			router.push(`/articles/${slug}`);
		}
	}, [account, isAuthenticated, router, slug]);

	useEffect(() => {
		async function loadArticle() {
			const response = await prismic.getByUID<any>('post', String(slug), {});

			const article = {
				slug,
				title: RichText.asText(response.data.title),
				content: RichText.asHtml(response.data.content.splice(0, 3)),
				updatedAt: new Date(response.last_publication_date).toLocaleDateString(
					'pt-BR',
					{
						day: '2-digit',
						month: 'long',
						year: 'numeric',
					}
				),
			};

			setArticle(article);
		}

		loadArticle();
	}, [prismic, slug]);

	return (
		<>
			<Head>
				<title>{article?.title} | Storytech</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.article}>
					<h1>{article?.title}</h1>
					<time>{article?.updatedAt}</time>
					<div
						className={`${styles.content} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: article?.content }}
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
