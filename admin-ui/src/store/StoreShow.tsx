import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
} from "react-admin";

export const StoreShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Store Address" source="storeAddress" />
        <TextField label="Store Admin" source="storeAdmin" />
        <TextField label="Store Email" source="storeEmail" />
        <TextField label="Store Name" source="storeName" />
        <TextField label="Store Owner" source="storeOwner" />
        <TextField label="Store Phone" source="storePhone" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
