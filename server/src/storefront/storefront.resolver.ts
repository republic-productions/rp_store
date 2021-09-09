import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { StorefrontResolverBase } from "./base/storefront.resolver.base";
import { Storefront } from "./base/Storefront";
import { StorefrontService } from "./storefront.service";

@graphql.Resolver(() => Storefront)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class StorefrontResolver extends StorefrontResolverBase {
  constructor(
    protected readonly service: StorefrontService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
