import { Role as TRole } from "../api/role/Role";

export const ROLE_TITLE_FIELD = "id";

export const RoleTitle = (record: TRole) => {
  return record.id;
};
