import { Address as TAddress } from "../api/address/Address";

export const ADDRESS_TITLE_FIELD = "id";

export const AddressTitle = (record: TAddress) => {
  return record.id;
};
