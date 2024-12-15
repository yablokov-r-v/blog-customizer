import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [tempState, setTempState] = useState(defaultArticleState);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--font-family',
			articleState.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			articleState.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			articleState.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			articleState.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			articleState.backgroundColor.value
		);
	}, [articleState]);

	const handleFontFamilyChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontFamilyOption: option,
		}));
		setSelectedFontFamily(option);
	};

	const handleFontSizeChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontSizeOption: option,
		}));
		setSelectedFontSize(option);
	};

	const handleFontColorChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontColor: option,
		}));
		setSelectedFontColor(option);
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			backgroundColor: option,
		}));
		setSelectedBackgroundColor(option);
	};

	const handleContentWidthChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			contentWidth: option,
		}));
		setSelectedContentWidth(option);
	};

	const handleApplyStyles = () => {
		setArticleState(tempState);
	};

	const handleResetStyles = () => {
		setTempState(defaultArticleState);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamilyOptions={fontFamilyOptions}
				selectedFontFamily={selectedFontFamily}
				handleFontFamilyChange={handleFontFamilyChange}
				fontSizeOptions={fontSizeOptions}
				selectedFontSize={selectedFontSize}
				handleFontSizeChange={handleFontSizeChange}
				fontColors={fontColors}
				selectedFontColor={selectedFontColor}
				handleFontColorChange={handleFontColorChange}
				backgroundColors={backgroundColors}
				selectedBackgroundColor={selectedBackgroundColor}
				handleBackgroundColorChange={handleBackgroundColorChange}
				contentWidthArr={contentWidthArr}
				selectedContentWidth={selectedContentWidth}
				handleContentWidthChange={handleContentWidthChange}
				handleApplyStyles={handleApplyStyles}
				handleResetStyles={handleResetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
