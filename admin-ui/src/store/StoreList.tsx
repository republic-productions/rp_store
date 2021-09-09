import * as React from "react";
import { List, Datagrid, ListProps, DateField, TextField } from "react-admin";
import Pagination from "../Components/Pagination";

export const StoreList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Stores"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Store Address" source="storeAddress" />
        <TextField label="Store Admin" source="storeAdmin" />
        <TextField label="Store Email" source="storeEmail" />
        <TextField label="Store Name" source="storeName" />
        <TextField label="Store Owner" source="storeOwner" />
        <TextField label="Store Phone" source="storePhone" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
