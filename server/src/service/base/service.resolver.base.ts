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
import { DeleteServiceArgs } from "./DeleteServiceArgs";
import { ServiceFindManyArgs } from "./ServiceFindManyArgs";
import { ServiceFindUniqueArgs } from "./ServiceFindUniqueArgs";
import { Service } from "./Service";
import { ServiceService } from "../service.service";

@graphql.Resolver(() => Service)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ServiceResolverBase {
  constructor(
    protected readonly service: ServiceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Service",
    action: "read",
    possession: "any",
  })
  async _servicesMeta(
    @graphql.Args() args: ServiceFindManyArgs
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

  @graphql.Query(() => [Service])
  @nestAccessControl.UseRoles({
    resource: "Service",
    action: "read",
    possession: "any",
  })
  async services(
    @graphql.Args() args: ServiceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Service[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Service",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Service, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Service",
    action: "read",
    possession: "own",
  })
  async service(
    @graphql.Args() args: ServiceFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Service | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Service",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Service)
  @nestAccessControl.UseRoles({
    resource: "Service",
    action: "delete",
    possession: "any",
  })
  async deleteService(
    @graphql.Args() args: DeleteServiceArgs
  ): Promise<Service | null> {
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
