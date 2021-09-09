import { PurchaseOrderWhereInput } from "./PurchaseOrderWhereInput";
import { PurchaseOrderOrderByInput } from "./PurchaseOrderOrderByInput";

export type PurchaseOrderFindManyArgs = {
  where?: PurchaseOrderWhereInput;
  orderBy?: PurchaseOrderOrderByInput;
  skip?: number;
  take?: number;
};
