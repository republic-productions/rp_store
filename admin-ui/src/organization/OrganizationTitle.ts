import { Organization as TOrganization } from "../api/organization/Organization";

export const ORGANIZATION_TITLE_FIELD = "id";

export const OrganizationTitle = (record: TOrganization) => {
  return record.id;
};
