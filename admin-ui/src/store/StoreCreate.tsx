import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const StoreCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Store Address" multiline source="storeAddress" />
        <TextInput label="Store Admin" source="storeAdmin" />
        <TextInput label="Store Email" source="storeEmail" type="email" />
        <TextInput label="Store Name" source="storeName" />
        <TextInput label="Store Owner" source="storeOwner" />
        <TextInput label="Store Phone" source="storePhone" />
      </SimpleForm>
    </Create>
  );
};
