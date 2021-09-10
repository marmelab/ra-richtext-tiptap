import * as React from 'react';
import { ReactNode, useEffect } from 'react';
import { useEditor, EditorOptions, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getFieldLabelTranslationArgs, InputProps, useInput, useResourceContext, useTranslate } from 'ra-core';
import { InputHelperText, Labeled, LabeledProps, sanitizeInputRestProps } from 'ra-ui-materialui';
import { TiptapEditorProvider } from './TiptapEditorProvider';
import { RichTextInputToolbar } from './RichTextInputToolbar';

/**
 * A rich text editor for the react-admin that is accessible and supports translations. Based on [Tiptap](https://www.tiptap.dev/).
 * @param props The input props. Accept all common react-admin input props.
 * @param {EditorOptions} props.editorOptions The options to pass to the Tiptap editor.
 * @param {ReactNode} props.toolbar The toolbar containing the editors commands.
 *
 * @example <caption>Customizing the editors options</caption>
 * import { RichTextInput, RichTextInputToolbar } from 'ra-richtext-tiptap';
 * const MyRichTextInput = (props) => (
 *     <RichTextInput
 *         toolbar={<RichTextInputToolbar size="large" />}
 *         label="Body"
 *         source="body"
 *         {...props}
 *     />
 * );
 *
 * @example <caption>Customizing the toolbar size</caption>
 * import { RichTextInput, RichTextInputToolbar } from 'ra-richtext-tiptap';
 * const MyRichTextInput = (props) => (
 *     <RichTextInput
 *         toolbar={<RichTextInputToolbar size="large" />}
 *         label="Body"
 *         source="body"
 *         {...props}
 *     />
 * );
 *
 * @example <caption>Customizing the toolbar commands</caption>
 * import { RichTextInput, RichTextInputToolbar } from 'ra-richtext-tiptap';
 * const MyRichTextInput = ({ size, ...props }) => (
 *     <RichTextInput
 *         toolbar={(
 *             <RichTextInputToolbar>
 *                 <RichTextInputLevelSelect size={size} />
 *                 <FormatButtons size={size} />
 *                 <ListButtons size={size} />
 *                 <LinkButtons size={size} />
 *                 <QuoteButtons size={size} />
 *                 <ClearButtons size={size} />
 *             </RichTextInputToolbar>
 *         )}
 *         label="Body"
 *         source="body"
 *         {...props}
 *     />
 * );
 */
export const RichTextInput = (props: RichTextInputProps) => {
	const {
		disabled = false,
		readOnly = false,
		editorOptions = DefaultEditorOptions,
		helperText,
		toolbar = <RichTextInputToolbar />,
		label,
		source,
		...rest
	} = props;

	const resource = useResourceContext(props);
	const classes = useStyles(props);
	const translate = useTranslate();
	const { id, input, isRequired, meta } = useInput(props);

	const finalLabel = label
		? translate(label, { _: label })
		: translate(
				...getFieldLabelTranslationArgs({
					label: label as string,
					resource,
					source,
				})
		  );

	const editor = useEditor({
		...editorOptions,
		content: input.value,
		editorProps: {
			attributes: {
				id,
				'aria-label': finalLabel,
				...(disabled || readOnly ? EditorAttributesNotEditable : EditorAttributes),
			},
		},
	});

	const { error, submitError, touched } = meta;

	useEffect(() => {
		if (!editor) return;

		editor.setOptions({
			editorProps: {
				attributes: {
					id,
					'aria-label': finalLabel,
					...(disabled || readOnly ? EditorAttributesNotEditable : EditorAttributes),
				},
			},
		});
	}, [disabled, editor, readOnly, finalLabel, id]);

	useEffect(() => {
		if (!editor) {
			return;
		}

		const handleEditorUpdate = () => {
			if (editor.isEmpty) {
				input.onChange('');
				input.onBlur();
				return;
			}

			const html = editor.getHTML();
			input.onChange(html);
			input.onBlur();
		};

		editor.on('update', handleEditorUpdate);
		return () => {
			editor.off('update', handleEditorUpdate);
		};
	}, [editor, input]);

	return (
		<Labeled
			id={id}
			isRequired={isRequired}
			label={label}
			meta={meta}
			source={source}
			resource={resource}
			{...sanitizeInputRestProps(rest)}
		>
			<div>
				<TiptapEditorProvider value={editor}>
					{toolbar}
					<EditorContent className={classes.editorContent} editor={editor} />
				</TiptapEditorProvider>
				<FormHelperText error={Boolean(error || submitError)}>
					<InputHelperText touched={touched} error={error || submitError} helperText={helperText} />
				</FormHelperText>
			</div>
		</Labeled>
	);
};

const EditorAttributes = {
	role: 'textbox',
	'aria-multiline': 'true',
};

const EditorAttributesNotEditable = {
	role: 'textbox',
	'aria-multiline': 'true',
	contenteditable: false,
	'aria-readonly': 'true',
};

export const DefaultEditorOptions = {
	extensions: [
		StarterKit,
		Underline,
		Link,
		TextAlign.configure({
			types: ['heading', 'paragraph'],
		}),
	],
};

const useStyles = makeStyles(
	(theme) => ({
		root: {},
		editorContent: {
			'& > div': {
				padding: theme.spacing(1),
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
				borderRadius: theme.shape.borderRadius,
			},
		},
	}),
	{
		name: 'RaRichTextInput',
	}
);

export type RichTextInputProps = InputProps &
	Omit<LabeledProps, 'children'> & {
		editorOptions?: Partial<EditorOptions>;
		toolbar?: ReactNode;
	};
