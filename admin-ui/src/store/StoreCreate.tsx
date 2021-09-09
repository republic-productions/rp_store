import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const StoreCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="StoreEmail" source="email" type="email" />
        <TextInput label="Store Name" source="storeName" />
      </SimpleForm>
    </Create>
  );
};
