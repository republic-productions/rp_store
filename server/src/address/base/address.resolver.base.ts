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
import { DeleteAddressArgs } from "./DeleteAddressArgs";
import { AddressFindManyArgs } from "./AddressFindManyArgs";
import { AddressFindUniqueArgs } from "./AddressFindUniqueArgs";
import { Address } from "./Address";
import { AddressService } from "../address.service";

@graphql.Resolver(() => Address)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class AddressResolverBase {
  constructor(
    protected readonly service: AddressService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "read",
    possession: "any",
  })
  async _addressesMeta(
    @graphql.Args() args: AddressFindManyArgs
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

  @graphql.Query(() => [Address])
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "read",
    possession: "any",
  })
  async addresses(
    @graphql.Args() args: AddressFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Address[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Address",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Address, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "read",
    possession: "own",
  })
  async address(
    @graphql.Args() args: AddressFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Address | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Address",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Address)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "delete",
    possession: "any",
  })
  async deleteAddress(
    @graphql.Args() args: DeleteAddressArgs
  ): Promise<Address | null> {
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
