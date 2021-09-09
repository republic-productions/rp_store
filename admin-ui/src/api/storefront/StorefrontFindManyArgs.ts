import { StorefrontWhereInput } from "./StorefrontWhereInput";
import { StorefrontOrderByInput } from "./StorefrontOrderByInput";

export type StorefrontFindManyArgs = {
  where?: StorefrontWhereInput;
  orderBy?: StorefrontOrderByInput;
  skip?: number;
  take?: number;
};
