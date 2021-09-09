import { Product as TProduct } from "../api/product/Product";

export const PRODUCT_TITLE_FIELD = "id";

export const ProductTitle = (record: TProduct) => {
  return record.id;
};
