import { PurchaseOrder as TPurchaseOrder } from "../api/purchaseOrder/PurchaseOrder";

export const PURCHASEORDER_TITLE_FIELD = "id";

export const PurchaseOrderTitle = (record: TPurchaseOrder) => {
  return record.id;
};
