import { VendorWhereInput } from "./VendorWhereInput";
import { VendorOrderByInput } from "./VendorOrderByInput";

export type VendorFindManyArgs = {
  where?: VendorWhereInput;
  orderBy?: VendorOrderByInput;
  skip?: number;
  take?: number;
};
