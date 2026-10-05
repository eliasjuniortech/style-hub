import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { UpdateUserDto } from "../../adapters/in/dtos/update-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class UpdateUserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, input: UpdateUserDto): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(email);
    if (!userExists) {
      throw new UserNotFoundException();
    }

    const firstName = input.firstName ? input.firstName : userExists.getFirstName();
    const lastName = input.lastName ? input.lastName : userExists.getLastName();

    const user = User.create(userExists.getId(), firstName, lastName, userExists.getEmail(), userExists.getPassword(), userExists.getAvatar(), userExists.getCreatedAt(), userExists.getUpdatedAt());

    await this.userRepository.update(user);
    return user;
  }
}
