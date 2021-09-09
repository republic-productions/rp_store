import { Storefront as TStorefront } from "../api/storefront/Storefront";

export const STOREFRONT_TITLE_FIELD = "id";

export const StorefrontTitle = (record: TStorefront) => {
  return record.id;
};
