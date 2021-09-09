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
import { DeleteSupportTicketArgs } from "./DeleteSupportTicketArgs";
import { SupportTicketFindManyArgs } from "./SupportTicketFindManyArgs";
import { SupportTicketFindUniqueArgs } from "./SupportTicketFindUniqueArgs";
import { SupportTicket } from "./SupportTicket";
import { SupportTicketService } from "../supportTicket.service";

@graphql.Resolver(() => SupportTicket)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SupportTicketResolverBase {
  constructor(
    protected readonly service: SupportTicketService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "SupportTicket",
    action: "read",
    possession: "any",
  })
  async _supportTicketsMeta(
    @graphql.Args() args: SupportTicketFindManyArgs
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

  @graphql.Query(() => [SupportTicket])
  @nestAccessControl.UseRoles({
    resource: "SupportTicket",
    action: "read",
    possession: "any",
  })
  async supportTickets(
    @graphql.Args() args: SupportTicketFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SupportTicket[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SupportTicket",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => SupportTicket, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "SupportTicket",
    action: "read",
    possession: "own",
  })
  async supportTicket(
    @graphql.Args() args: SupportTicketFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SupportTicket | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SupportTicket",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => SupportTicket)
  @nestAccessControl.UseRoles({
    resource: "SupportTicket",
    action: "delete",
    possession: "any",
  })
  async deleteSupportTicket(
    @graphql.Args() args: DeleteSupportTicketArgs
  ): Promise<SupportTicket | null> {
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
