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
import { DeleteSubscriptionArgs } from "./DeleteSubscriptionArgs";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionFindUniqueArgs } from "./SubscriptionFindUniqueArgs";
import { Subscription } from "./Subscription";
import { SubscriptionService } from "../subscription.service";

@graphql.Resolver(() => Subscription)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SubscriptionResolverBase {
  constructor(
    protected readonly service: SubscriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async _subscriptionsMeta(
    @graphql.Args() args: SubscriptionFindManyArgs
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

  @graphql.Query(() => [Subscription])
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "any",
  })
  async subscriptions(
    @graphql.Args() args: SubscriptionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subscription",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Subscription, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "read",
    possession: "own",
  })
  async subscription(
    @graphql.Args() args: SubscriptionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subscription | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Subscription",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Subscription)
  @nestAccessControl.UseRoles({
    resource: "Subscription",
    action: "delete",
    possession: "any",
  })
  async deleteSubscription(
    @graphql.Args() args: DeleteSubscriptionArgs
  ): Promise<Subscription | null> {
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
