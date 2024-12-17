import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleUpdateArticleState = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				handleUpdateArticleState={handleUpdateArticleState}
			/>
			<Article articleState={articleState} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
