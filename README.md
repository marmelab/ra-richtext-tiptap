# ra-richtext-tiptap

A rich text editor for [React Admin](http://marmelab.com/react-admin), based on [TipTap](https://www.tiptap.dev/)

![tiptap](https://user-images.githubusercontent.com/99944/133393239-3cc84197-a7d0-4134-84e3-26e932980c05.gif)

## Installation

```sh
npm install ra-richtext-tiptap
# or
yarn add ra-richtext-tiptap
```

## Usage

Use it as you would any react-admin inputs:

```jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-richtext-tiptap';

export const PostEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="title" />
			<RichTextInput source="body" />
		</SimpleForm>
	</Edit>
);
```

## Customizing the Toolbar

The `<RichTextInput>` component has a `toolar` prop that accepts a `ReactNode`.

You can leverage this to change the buttons [size](#api):

```jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput, RichTextInputToolbar } from 'ra-richtext-tiptap';

export const PostEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="title" />
			<RichTextInput source="body" toolbar={<RichTextInputToolbar size="large" />} />
		</SimpleForm>
	</Edit>
);
```

Or to remove some prebuilt components:

```jsx
import {
	RichTextInput,
	RichTextInputToolbar,
	RichTextInputLevelSelect,
	FormatButtons,
	ListButtons,
	LinkButtons,
	QuoteButtons,
	ClearButtons,
} from 'ra-richtext-tiptap';
const MyRichTextInput = ({ size, ...props }) => (
	<RichTextInput
		toolbar={
			<RichTextInputToolbar>
				<RichTextInputLevelSelect size={size} />
				<FormatButtons size={size} />
				<ListButtons size={size} />
				<LinkButtons size={size} />
				<QuoteButtons size={size} />
				<ClearButtons size={size} />
			</RichTextInputToolbar>
		}
		label="Body"
		source="body"
		{...props}
	/>
);
```
