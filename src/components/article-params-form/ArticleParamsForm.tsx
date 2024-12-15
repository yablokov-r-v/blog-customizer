import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import styles from './ArticleParamsForm.module.scss';
import { OptionType } from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator/Separator';

type ArticleParamsFormProps = {
	fontFamilyOptions: OptionType[];
	selectedFontFamily: OptionType;
	handleFontFamilyChange: (option: OptionType) => void;

	fontSizeOptions: OptionType[];
	selectedFontSize: OptionType;
	handleFontSizeChange: (option: OptionType) => void;

	fontColors: OptionType[];
	selectedFontColor: OptionType;
	handleFontColorChange: (option: OptionType) => void;

	backgroundColors: OptionType[];
	selectedBackgroundColor: OptionType;
	handleBackgroundColorChange: (option: OptionType) => void;

	contentWidthArr: OptionType[];
	selectedContentWidth: OptionType;
	handleContentWidthChange: (option: OptionType) => void;

	handleApplyStyles: () => void;
	handleResetStyles: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	fontFamilyOptions,
	selectedFontFamily,
	handleFontFamilyChange,

	fontSizeOptions,
	selectedFontSize,
	handleFontSizeChange,

	fontColors,
	selectedFontColor,
	handleFontColorChange,

	backgroundColors,
	selectedBackgroundColor,
	handleBackgroundColorChange,

	contentWidthArr,
	selectedContentWidth,
	handleContentWidthChange,

	handleApplyStyles,
	handleResetStyles,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const asideRef = useRef(null);

	const handleArrowBottonClick = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: asideRef,
		onClose: () => setIsAsideOpen(false),
		onChange: setIsAsideOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={handleArrowBottonClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isAsideOpen,
				})}>
				<form className={styles.form}>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
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
