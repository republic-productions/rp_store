import { SortOrder } from "../../util/SortOrder";

export type StoreOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  email?: SortOrder;
  storeName?: SortOrder;
  updatedAt?: SortOrder;
};
