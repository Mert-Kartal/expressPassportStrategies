import { prisma } from "../config";
import { Provider, Account } from "@prisma/client";

export class AccountRepository {
  static async create(
    userId: string,
    provider: Provider,
    providerAccountId: string
  ) {
    return await prisma.account.create({
      data: {
        userId,
        provider,
        providerAccountId,
      },
      include: {
        User: true,
      },
    });
  }

  static async find(provider: Provider, providerAccountId: string) {
    return await prisma.account.findUnique({
      where: { provider, providerAccountId },
      include: {
        User: true,
      },
    });
  }

  static async findByUserAccounts(userId: string) {
    return await prisma.account.findMany({
      where: { userId },
    });
  }

  static async delete(providerAccountId: string) {
    return await prisma.account.delete({
      where: { providerAccountId },
    });
  }
}
