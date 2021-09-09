import { PrismaService } from "nestjs-prisma";
import { Prisma, Vendor } from "@prisma/client";

export class VendorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.VendorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorFindManyArgs>
  ): Promise<number> {
    return this.prisma.vendor.count(args);
  }

  async findMany<T extends Prisma.VendorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorFindManyArgs>
  ): Promise<Vendor[]> {
    return this.prisma.vendor.findMany(args);
  }
  async findOne<T extends Prisma.VendorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorFindUniqueArgs>
  ): Promise<Vendor | null> {
    return this.prisma.vendor.findUnique(args);
  }
  async create<T extends Prisma.VendorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorCreateArgs>
  ): Promise<Vendor> {
    return this.prisma.vendor.create<T>(args);
  }
  async update<T extends Prisma.VendorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorUpdateArgs>
  ): Promise<Vendor> {
    return this.prisma.vendor.update<T>(args);
  }
  async delete<T extends Prisma.VendorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.VendorDeleteArgs>
  ): Promise<Vendor> {
    return this.prisma.vendor.delete(args);
  }
}
