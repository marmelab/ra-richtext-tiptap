import * as React from 'react';
import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RichTextInputLevelSelect } from './RichTextInputLevelSelect';
import {
	AlignmentButtons,
	FormatButtons,
	ListButtons,
	LinkButtons,
	QuoteButtons,
	ClearButtons,
} from './RichTextInputDefaultButtons';

/**
 * A toolbar for the <RichTextInput>.
 * @param props The toolbar props.
 * @param {ReactNode} props.children The toolbar children, usually many <ToggleButton>.
 * @param {'small' | 'medium' | 'large'} props.size The default size to apply to the **default** children.
 *
 * @example <caption>Customizing the size</caption>
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
 * @example <caption>Customizing the children</caption>
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
export const RichTextInputToolbar = (props: RichTextInputToolbarProps) => {
	const classes = useStyles(props);
	const {
		size = 'medium',
		children = (
			<>
				<RichTextInputLevelSelect size={size} />
				<FormatButtons size={size} />
				<AlignmentButtons size={size} />
				<ListButtons size={size} />
				<LinkButtons size={size} />
				<QuoteButtons size={size} />
				<ClearButtons size={size} />
			</>
		),
		...rest
	} = props;

	return (
		<div className={classes.root} {...rest}>
			{children}
		</div>
	);
};

const useStyles = makeStyles(
	(theme) => ({
		root: {
			display: 'inline-flex',
			marginBottom: theme.spacing(1),
			alignItems: 'center',
			'& > *': {
				marginRight: theme.spacing(1),
			},
			'& > *:last-child': {
				marginRight: 0,
			},
		},
	}),
	{
		name: 'RaRichTextInputToolbar',
	}
);

export type RichTextInputToolbarProps = {
	children?: ReactNode;
	size?: 'small' | 'medium' | 'large';
};
