import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from '../../contexts/AccountContext';

import styles from '../../styles/article.module.scss';

type Article = {
	slug: string;
	title: string;
	content: string;
	updatedAt: string;
};

export default function Article() {
	const { account, isAuthenticated } = useAccount();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated || !account?.subscriber) {
			router.push('/');
		}
	}, [router, account, isAuthenticated]);

	const [article, setArticle] = useState<Article>({
		slug: 'nextjs-novidades-na-versao-10',
		title: 'NextJS: Novidades na versão 10',
		content:
			'Se você nos acompanhou nos últimos posts, já viu que criamos um blog com um contador de visitas usando o MongoDB e Next.js, depois adicionamos a funcionalidade de dark mode. Na semana passada aconteceu a Next.js Conf. Uma das surpresas foi o anúncio da versão 10, com várias melhorias. Vamos experimentar algumas dessas melhorias e aplicar na prática no blog que criamos para ir evoluindo com essa ferramenta que tem revolucionado a web. Novidades na versão 10: Built-in Image Component and Automatic Image Optimization: Otimização automática de imagens usando o novo componente <Image/> de next/imagem; Internationalized Routing: Facilidades na internacionalização do projeto web; Next.js Analytics: Dashboard na plataforma da Vercel com dados reais sobre o comportamento do usuário na aplicação e sua performance; Next.js Commerce: Boilerplate muito bonito e performático, com as melhores práticas para desenvolver o Front End de um e-commerce; React 17 Support: Agora você não precisa importar o React toda vez que criar ou usar um componente React — diminuindo assim várias linhas de código; getStaticProps / getServerSideProps Fast Refresh: Pode editar os códigos dentro desses métodos sem precisar reiniciar o app manualmente; Fast Refresh for MDX: When using @next/mdx, Se que mexer no conteúdo que está em Markdown o app faz refresh sem precisar ser feito manualmente; Importing CSS from Third Party React Components: Suporte a importação apenas do CSS necessário do componente de bibliotecas de terceiros; Blocking Fallback for getStaticPaths: Melhoria na geração de páginas dinâmicas no servidor.',
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
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>
				</article>
			</main>
		</>
	);
}
