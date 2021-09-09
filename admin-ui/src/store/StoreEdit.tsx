import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const StoreEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="StoreEmail" source="email" type="email" />
        <TextInput label="Store Name" source="storeName" />
      </SimpleForm>
    </Edit>
  );
};
