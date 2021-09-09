import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StoreService } from "./store.service";
import { StoreControllerBase } from "./base/store.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("stores")
@common.Controller("stores")
export class StoreController extends StoreControllerBase {
  constructor(
    protected readonly service: StoreService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
