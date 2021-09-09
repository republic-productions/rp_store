import { PrismaService } from "nestjs-prisma";
import { Prisma, Storefront } from "@prisma/client";

export class StorefrontServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.StorefrontFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontFindManyArgs>
  ): Promise<number> {
    return this.prisma.storefront.count(args);
  }

  async findMany<T extends Prisma.StorefrontFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontFindManyArgs>
  ): Promise<Storefront[]> {
    return this.prisma.storefront.findMany(args);
  }
  async findOne<T extends Prisma.StorefrontFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontFindUniqueArgs>
  ): Promise<Storefront | null> {
    return this.prisma.storefront.findUnique(args);
  }
  async create<T extends Prisma.StorefrontCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontCreateArgs>
  ): Promise<Storefront> {
    return this.prisma.storefront.create<T>(args);
  }
  async update<T extends Prisma.StorefrontUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontUpdateArgs>
  ): Promise<Storefront> {
    return this.prisma.storefront.update<T>(args);
  }
  async delete<T extends Prisma.StorefrontDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.StorefrontDeleteArgs>
  ): Promise<Storefront> {
    return this.prisma.storefront.delete(args);
  }
}
