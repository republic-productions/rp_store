import { Business as TBusiness } from "../api/business/Business";

export const BUSINESS_TITLE_FIELD = "id";

export const BusinessTitle = (record: TBusiness) => {
  return record.id;
};
