import { SortOrder } from "../../util/SortOrder";

export type StoreOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  storeAddress?: SortOrder;
  storeAdmin?: SortOrder;
  storeEmail?: SortOrder;
  storeName?: SortOrder;
  storeOwner?: SortOrder;
  storePhone?: SortOrder;
  updatedAt?: SortOrder;
};
