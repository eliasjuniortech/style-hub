import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class FindUserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
