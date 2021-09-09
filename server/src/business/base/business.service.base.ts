import { PrismaService } from "nestjs-prisma";
import { Prisma, Business } from "@prisma/client";

export class BusinessServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BusinessFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessFindManyArgs>
  ): Promise<number> {
    return this.prisma.business.count(args);
  }

  async findMany<T extends Prisma.BusinessFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessFindManyArgs>
  ): Promise<Business[]> {
    return this.prisma.business.findMany(args);
  }
  async findOne<T extends Prisma.BusinessFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessFindUniqueArgs>
  ): Promise<Business | null> {
    return this.prisma.business.findUnique(args);
  }
  async create<T extends Prisma.BusinessCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessCreateArgs>
  ): Promise<Business> {
    return this.prisma.business.create<T>(args);
  }
  async update<T extends Prisma.BusinessUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessUpdateArgs>
  ): Promise<Business> {
    return this.prisma.business.update<T>(args);
  }
  async delete<T extends Prisma.BusinessDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BusinessDeleteArgs>
  ): Promise<Business> {
    return this.prisma.business.delete(args);
  }
}
