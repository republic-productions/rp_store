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
import { DeleteSupplierArgs } from "./DeleteSupplierArgs";
import { SupplierFindManyArgs } from "./SupplierFindManyArgs";
import { SupplierFindUniqueArgs } from "./SupplierFindUniqueArgs";
import { Supplier } from "./Supplier";
import { SupplierService } from "../supplier.service";

@graphql.Resolver(() => Supplier)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SupplierResolverBase {
  constructor(
    protected readonly service: SupplierService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Supplier",
    action: "read",
    possession: "any",
  })
  async _suppliersMeta(
    @graphql.Args() args: SupplierFindManyArgs
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

  @graphql.Query(() => [Supplier])
  @nestAccessControl.UseRoles({
    resource: "Supplier",
    action: "read",
    possession: "any",
  })
  async suppliers(
    @graphql.Args() args: SupplierFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Supplier[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Supplier",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Supplier, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Supplier",
    action: "read",
    possession: "own",
  })
  async supplier(
    @graphql.Args() args: SupplierFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Supplier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Supplier",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Supplier)
  @nestAccessControl.UseRoles({
    resource: "Supplier",
    action: "delete",
    possession: "any",
  })
  async deleteSupplier(
    @graphql.Args() args: DeleteSupplierArgs
  ): Promise<Supplier | null> {
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
