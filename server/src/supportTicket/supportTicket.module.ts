import { Module } from "@nestjs/common";
import { SupportTicketModuleBase } from "./base/supportTicket.module.base";
import { SupportTicketService } from "./supportTicket.service";
import { SupportTicketController } from "./supportTicket.controller";
import { SupportTicketResolver } from "./supportTicket.resolver";

@Module({
  imports: [SupportTicketModuleBase],
  controllers: [SupportTicketController],
  providers: [SupportTicketService, SupportTicketResolver],
  exports: [SupportTicketService],
})
export class SupportTicketModule {}
