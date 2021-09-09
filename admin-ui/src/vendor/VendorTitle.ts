import { Vendor as TVendor } from "../api/vendor/Vendor";

export const VENDOR_TITLE_FIELD = "id";

export const VendorTitle = (record: TVendor) => {
  return record.id;
};
