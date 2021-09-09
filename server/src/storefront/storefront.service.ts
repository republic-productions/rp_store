import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { StorefrontServiceBase } from "./base/storefront.service.base";

@Injectable()
export class StorefrontService extends StorefrontServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
