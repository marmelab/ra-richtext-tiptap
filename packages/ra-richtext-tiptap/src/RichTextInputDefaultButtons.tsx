import * as React from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@material-ui/lab';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatStrikethrough from '@material-ui/icons/FormatStrikethrough';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustify';
import FormatQuote from '@material-ui/icons/FormatQuote';
import FormatClear from '@material-ui/icons/FormatClear';
import InsertLink from '@material-ui/icons/InsertLink';
import Code from '@material-ui/icons/Code';
import { useTranslate } from 'ra-core';
import { useTiptapEditor } from './useTiptapEditor';

export const FormatButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();

	const boldLabel = translate('ra.tiptap.bold', {
		_: 'Bold',
	});

	const italicLabel = translate('ra.tiptap.Italic', {
		_: 'Italic',
	});

	const underlineLabel = translate('ra.tiptap.underline', {
		_: 'Underline',
	});

	const strikeLabel = translate('ra.tiptap.strike', {
		_: 'Strikethrough',
	});

	const codeLabel = translate('ra.tiptap.code', {
		_: 'Code',
	});

	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={boldLabel}
				title={boldLabel}
				onClick={() => editor.chain().focus().toggleBold().run()}
				selected={editor && editor.isActive('bold')}
			>
				<FormatBold fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={italicLabel}
				title={italicLabel}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				selected={editor && editor.isActive('italic')}
			>
				<FormatItalic fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={underlineLabel}
				title={underlineLabel}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				selected={editor && editor.isActive('underline')}
			>
				<FormatUnderlined fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={strikeLabel}
				title={strikeLabel}
				onClick={() => editor.chain().focus().toggleStrike().run()}
				selected={editor && editor.isActive('strike')}
			>
				<FormatStrikethrough fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={codeLabel}
				title={codeLabel}
				onClick={() => editor.chain().focus().toggleCode().run()}
				selected={editor && editor.isActive('code')}
			>
				<Code fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export const ListButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();

	const bulletListLabel = translate('ra.tiptap.list_bulleted', {
		_: 'Bulleted list',
	});
	const numberListLabel = translate('ra.tiptap.list_numbered', {
		_: 'Numbered list',
	});
	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={bulletListLabel}
				title={bulletListLabel}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				selected={editor && editor.isActive('bulletList')}
			>
				<FormatListBulleted fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={numberListLabel}
				title={numberListLabel}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				selected={editor && editor.isActive('orderedList')}
			>
				<FormatListNumbered fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export const AlignmentButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();

	const leftLabel = translate('ra.tiptap.align_left', { _: 'Align left' });
	const rightLabel = translate('ra.tiptap.align_right', { _: 'Align right' });
	const centerLabel = translate('ra.tiptap.align_center', { _: 'Center' });
	const justifyLabel = translate('ra.tiptap.align_justify', { _: 'Justify' });

	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={leftLabel}
				title={leftLabel}
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				selected={editor && editor.isActive({ textAlign: 'left' })}
			>
				<FormatAlignLeft fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={centerLabel}
				title={centerLabel}
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				selected={editor && editor.isActive({ textAlign: 'center' })}
			>
				<FormatAlignCenter fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={rightLabel}
				title={rightLabel}
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				selected={editor && editor.isActive({ textAlign: 'right' })}
			>
				<FormatAlignRight fontSize="inherit" />
			</ToggleButton>
			<ToggleButton
				aria-label={justifyLabel}
				title={justifyLabel}
				onClick={() => editor.chain().focus().setTextAlign('justify').run()}
				selected={editor && editor.isActive({ textAlign: 'justify' })}
			>
				<FormatAlignJustify fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export const LinkButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();
	const disabled = editor
		? editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to).length === 0
		: false;

	const label = translate('ra.tiptap.link', {
		_: 'Add a link',
	});

	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={label}
				title={label}
				onClick={() => {
					if (!editor.can().setLink({ href: '' })) {
						return;
					}

					const url = window.prompt('URL');

					editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
				}}
				selected={editor && editor.isActive('link')}
				disabled={disabled}
			>
				<InsertLink fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export const QuoteButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();

	const label = translate('ra.tiptap.blockquote', {
		_: 'Blockquote',
	});

	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={label}
				title={label}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				selected={editor && editor.isActive('blockquote')}
			>
				<FormatQuote fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export const ClearButtons = (props: ToggleButtonGroupProps) => {
	const editor = useTiptapEditor();
	const translate = useTranslate();

	const label = translate('ra.tiptap.clear_format', {
		_: 'Clear format',
	});

	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton
				aria-label={label}
				title={label}
				onClick={() => editor.chain().focus().unsetAllMarks().run()}
				selected={false}
			>
				<FormatClear fontSize="inherit" />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
