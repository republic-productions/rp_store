import { SupportTicket as TSupportTicket } from "../api/supportTicket/SupportTicket";

export const SUPPORTTICKET_TITLE_FIELD = "id";

export const SupportTicketTitle = (record: TSupportTicket) => {
  return record.id;
};
