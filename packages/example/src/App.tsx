import * as React from 'react';
import {
	Admin,
	Datagrid,
	Edit,
	EditButton,
	EditProps,
	RichTextField,
	TextField,
	List,
	ListProps,
	Resource,
	ShowProps,
	Show,
	ShowButton,
	SimpleForm,
	SimpleShowLayout,
	TextInput,
} from 'react-admin';
import fakeRestDataProvider from 'ra-data-fakerest';
import generateData from 'data-generator-retail';
import { RichTextInput } from 'ra-richtext-tiptap';

export const App = () => (
	<Admin dataProvider={fakeRestDataProvider(generateData(), true)}>
		<Resource name="products" list={ProductList} edit={ProductEdit} show={ProductShow} />
	</Admin>
);

const ProductList = (props: ListProps) => (
	<List {...props}>
		<Datagrid>
			<TextField source="reference" />
			<EditButton />
			<ShowButton />
		</Datagrid>
	</List>
);

const ProductEdit = (props: EditProps) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="reference" />
			<RichTextInput source="description" />
		</SimpleForm>
	</Edit>
);

const ProductShow = (props: ShowProps) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="reference" />
			<RichTextField source="description" />
		</SimpleShowLayout>
	</Show>
);
