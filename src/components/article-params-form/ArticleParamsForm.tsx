import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	handleUpdateArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	handleUpdateArticleState,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const [tempState, setTempState] = useState<ArticleStateType>(articleState);
	const asideRef = useRef(null);

	useEffect(() => {
		setTempState(articleState);
	}, [articleState]);

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: asideRef,
		onClose: () => setIsAsideOpen(false),
		onChange: setIsAsideOpen,
	});

	const handleArrowBottonClick = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setTempState((prevState) => ({
			...prevState,
			contentWidth: option,
		}));
	};

	const handleApplyStyles = () => {
		handleUpdateArticleState(tempState);
	};

	const handleResetStyles = () => {
		setTempState(defaultArticleState);
		handleUpdateArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={handleArrowBottonClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isAsideOpen,
				})}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={tempState.fontFamilyOption}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={tempState.fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={tempState.backgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={tempState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleResetStyles}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApplyStyles}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
