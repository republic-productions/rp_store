import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const StoreEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Store Address" multiline source="storeAddress" />
        <TextInput label="Store Admin" source="storeAdmin" />
        <TextInput label="Store Email" source="storeEmail" type="email" />
        <TextInput label="Store Name" source="storeName" />
        <TextInput label="Store Owner" source="storeOwner" />
        <TextInput label="Store Phone" source="storePhone" />
      </SimpleForm>
    </Edit>
  );
};
