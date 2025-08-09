import { prisma } from "../config";
import { UserAuthType } from "../dto/user";

export class UserRepository {
  static async create(data: UserAuthType) {
    return prisma.user.create({
      data,
    });
  }

  static async index() {
    return prisma.user.findMany();
  }

  static async show(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async update(id: string, data: UserAuthType) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
