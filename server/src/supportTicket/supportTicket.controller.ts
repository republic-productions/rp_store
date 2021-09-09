import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SupportTicketService } from "./supportTicket.service";
import { SupportTicketControllerBase } from "./base/supportTicket.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("support-tickets")
@common.Controller("support-tickets")
export class SupportTicketController extends SupportTicketControllerBase {
  constructor(
    protected readonly service: SupportTicketService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
