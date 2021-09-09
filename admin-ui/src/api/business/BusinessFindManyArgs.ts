import { BusinessWhereInput } from "./BusinessWhereInput";
import { BusinessOrderByInput } from "./BusinessOrderByInput";

export type BusinessFindManyArgs = {
  where?: BusinessWhereInput;
  orderBy?: BusinessOrderByInput;
  skip?: number;
  take?: number;
};
