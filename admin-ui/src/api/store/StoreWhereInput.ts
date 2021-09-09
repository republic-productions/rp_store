import { StringFilter } from "../../util/StringFilter";

export type StoreWhereInput = {
  id?: StringFilter;
  storeAddress?: StringFilter;
  storeAdmin?: StringFilter;
  storeEmail?: StringFilter;
  storeName?: StringFilter;
  storeOwner?: StringFilter;
  storePhone?: StringFilter;
};
