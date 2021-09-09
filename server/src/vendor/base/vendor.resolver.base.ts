import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { DeleteVendorArgs } from "./DeleteVendorArgs";
import { VendorFindManyArgs } from "./VendorFindManyArgs";
import { VendorFindUniqueArgs } from "./VendorFindUniqueArgs";
import { Vendor } from "./Vendor";
import { VendorService } from "../vendor.service";

@graphql.Resolver(() => Vendor)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class VendorResolverBase {
  constructor(
    protected readonly service: VendorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Vendor",
    action: "read",
    possession: "any",
  })
  async _vendorsMeta(
    @graphql.Args() args: VendorFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Vendor])
  @nestAccessControl.UseRoles({
    resource: "Vendor",
    action: "read",
    possession: "any",
  })
  async vendors(
    @graphql.Args() args: VendorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Vendor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Vendor",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Vendor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Vendor",
    action: "read",
    possession: "own",
  })
  async vendor(
    @graphql.Args() args: VendorFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Vendor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Vendor",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Vendor)
  @nestAccessControl.UseRoles({
    resource: "Vendor",
    action: "delete",
    possession: "any",
  })
  async deleteVendor(
    @graphql.Args() args: DeleteVendorArgs
  ): Promise<Vendor | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
