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
import { DeleteBusinessArgs } from "./DeleteBusinessArgs";
import { BusinessFindManyArgs } from "./BusinessFindManyArgs";
import { BusinessFindUniqueArgs } from "./BusinessFindUniqueArgs";
import { Business } from "./Business";
import { BusinessService } from "../business.service";

@graphql.Resolver(() => Business)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class BusinessResolverBase {
  constructor(
    protected readonly service: BusinessService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Business",
    action: "read",
    possession: "any",
  })
  async _businessesMeta(
    @graphql.Args() args: BusinessFindManyArgs
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

  @graphql.Query(() => [Business])
  @nestAccessControl.UseRoles({
    resource: "Business",
    action: "read",
    possession: "any",
  })
  async businesses(
    @graphql.Args() args: BusinessFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Business[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Business",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Business, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Business",
    action: "read",
    possession: "own",
  })
  async business(
    @graphql.Args() args: BusinessFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Business | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Business",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Business)
  @nestAccessControl.UseRoles({
    resource: "Business",
    action: "delete",
    possession: "any",
  })
  async deleteBusiness(
    @graphql.Args() args: DeleteBusinessArgs
  ): Promise<Business | null> {
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
