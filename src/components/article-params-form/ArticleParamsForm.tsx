import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
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
	handleUpdateArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	handleUpdateArticleState,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const [tempState, setTempState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef(null);

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: asideRef,
		onClose: () => setIsAsideOpen(false),
		onChange: setIsAsideOpen,
	});

	const handleArrowBottonClick = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setTempState((prevState) => ({ ...prevState, [field]: value }));
		};
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
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={tempState.fontColor}
						onChange={handleOnChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={tempState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={tempState.contentWidth}
						onChange={handleOnChange('contentWidth')}
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
