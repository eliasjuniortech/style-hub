import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../../infrastructure/prisma/prisma.service";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repository/user.repository";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
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

  async save(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.getId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        avatar: user.getAvatar(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.getId(),
      },
      data: {
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        updatedAt: user.getUpdatedAt(),
      },
    });
  }

  async updateAvatar(id: string, path: string): Promise<User> {
    const user = await this.prismaService.user.update({ where: { id: id }, data: { avatar: path } });

    return User.create(user.id, user.firstName, user.lastName, user.email, user.password, user.avatar, user.createdAt, user.updatedAt);
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id: id } });
  }
}
