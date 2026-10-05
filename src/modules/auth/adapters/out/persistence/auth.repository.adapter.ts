import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../../infrastructure/prisma/prisma.service";
import { User } from "../../../../user/domain/entities/user.entity";
import { AuthRepository } from "../../../domain/repository/auth.repository";

@Injectable()
export class AuthRepositoryAdapter implements AuthRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email: email } });
    if (!user) {
      return null;
    }
    return User.create(user.id, user.firstName, user.lastName, user.email, user.password, user.avatar, user.createdAt, user.updatedAt);
  }
}
