import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StorefrontService } from "./storefront.service";
import { StorefrontControllerBase } from "./base/storefront.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("storefronts")
@common.Controller("storefronts")
export class StorefrontController extends StorefrontControllerBase {
  constructor(
    protected readonly service: StorefrontService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
