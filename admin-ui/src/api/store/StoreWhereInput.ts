import { StringFilter } from "../../util/StringFilter";

export type StoreWhereInput = {
  id?: StringFilter;
  email?: StringFilter;
  storeName?: StringFilter;
};
