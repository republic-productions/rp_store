import { PrismaService } from "nestjs-prisma";
import { Prisma, SupportTicket } from "@prisma/client";

export class SupportTicketServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SupportTicketFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketFindManyArgs>
  ): Promise<number> {
    return this.prisma.supportTicket.count(args);
  }

  async findMany<T extends Prisma.SupportTicketFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketFindManyArgs>
  ): Promise<SupportTicket[]> {
    return this.prisma.supportTicket.findMany(args);
  }
  async findOne<T extends Prisma.SupportTicketFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketFindUniqueArgs>
  ): Promise<SupportTicket | null> {
    return this.prisma.supportTicket.findUnique(args);
  }
  async create<T extends Prisma.SupportTicketCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketCreateArgs>
  ): Promise<SupportTicket> {
    return this.prisma.supportTicket.create<T>(args);
  }
  async update<T extends Prisma.SupportTicketUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketUpdateArgs>
  ): Promise<SupportTicket> {
    return this.prisma.supportTicket.update<T>(args);
  }
  async delete<T extends Prisma.SupportTicketDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SupportTicketDeleteArgs>
  ): Promise<SupportTicket> {
    return this.prisma.supportTicket.delete(args);
  }
}
