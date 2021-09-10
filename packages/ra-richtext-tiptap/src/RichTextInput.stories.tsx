import * as React from 'react';
import { Form, FormProps } from 'react-final-form';
import { TranslationProvider, required } from 'ra-core';
import { RichTextInput } from './RichTextInput';
import { RichTextInputToolbar } from './RichTextInputToolbar';

export default { title: 'Basic Usage' };

export const Basic = (props: Partial<FormProps>) => (
	<TranslationProvider
		i18nProvider={{
			translate: (key, options) => options?._ || key,
			changeLocale: async (locale: string, options?: any) => Promise.resolve(),
			getLocale: () => 'en',
		}}
	>
		<Form
			initialValues={{ body: 'Hello World' }}
			onSubmit={() => {}}
			render={() => (
				<>
					<RichTextInput label="Body" source="body" />
					<button type="submit">Save</button>
				</>
			)}
			{...props}
		/>
	</TranslationProvider>
);

export const Small = (props: Partial<FormProps>) => (
	<TranslationProvider
		i18nProvider={{
			translate: (key, options) => options?._ || key,
			changeLocale: async (locale: string, options?: any) => Promise.resolve(),
			getLocale: () => 'en',
		}}
	>
		<Form
			initialValues={{ body: 'Hello World' }}
			onSubmit={() => {}}
			render={() => (
				<>
					<RichTextInput toolbar={<RichTextInputToolbar size="small" />} label="Body" source="body" />
					<button type="submit">Save</button>
				</>
			)}
			{...props}
		/>
	</TranslationProvider>
);

export const Large = (props: Partial<FormProps>) => (
	<TranslationProvider
		i18nProvider={{
			translate: (key, options) => options?._ || key,
			changeLocale: async (locale: string, options?: any) => Promise.resolve(),
			getLocale: () => 'en',
		}}
	>
		<Form
			initialValues={{ body: 'Hello World' }}
			onSubmit={() => {}}
			render={() => (
				<>
					<RichTextInput toolbar={<RichTextInputToolbar size="large" />} label="Body" source="body" />
					<button type="submit">Save</button>
				</>
			)}
			{...props}
		/>
	</TranslationProvider>
);

export const Validation = (props: Partial<FormProps>) => (
	<TranslationProvider
		i18nProvider={{
			translate: (key, options) => options?._ || key,
			changeLocale: async (locale: string, options?: any) => Promise.resolve(),
			getLocale: () => 'en',
		}}
	>
		<Form
			initialValues={{ body: 'Hello World' }}
			onSubmit={() => {}}
			render={() => (
				<>
					<RichTextInput label="Body" source="body" validate={required()} />
					<button type="submit">Save</button>
				</>
			)}
			{...props}
		/>
	</TranslationProvider>
);
