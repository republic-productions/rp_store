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
import { DeleteStorefrontArgs } from "./DeleteStorefrontArgs";
import { StorefrontFindManyArgs } from "./StorefrontFindManyArgs";
import { StorefrontFindUniqueArgs } from "./StorefrontFindUniqueArgs";
import { Storefront } from "./Storefront";
import { StorefrontService } from "../storefront.service";

@graphql.Resolver(() => Storefront)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class StorefrontResolverBase {
  constructor(
    protected readonly service: StorefrontService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Storefront",
    action: "read",
    possession: "any",
  })
  async _storefrontsMeta(
    @graphql.Args() args: StorefrontFindManyArgs
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

  @graphql.Query(() => [Storefront])
  @nestAccessControl.UseRoles({
    resource: "Storefront",
    action: "read",
    possession: "any",
  })
  async storefronts(
    @graphql.Args() args: StorefrontFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Storefront[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Storefront",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Storefront, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Storefront",
    action: "read",
    possession: "own",
  })
  async storefront(
    @graphql.Args() args: StorefrontFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Storefront | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Storefront",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Storefront)
  @nestAccessControl.UseRoles({
    resource: "Storefront",
    action: "delete",
    possession: "any",
  })
  async deleteStorefront(
    @graphql.Args() args: DeleteStorefrontArgs
  ): Promise<Storefront | null> {
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
