import { Injectable } from "@nestjs/common";
import { UploadRepository } from "../../../../infrastructure/upload/upload.repository";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class UpdateUserAvatarService {
  private readonly userRepository: UserRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(userRepository: UserRepository, uploadRepository: UploadRepository) {
    this.userRepository = userRepository;
    this.uploadRepository = uploadRepository;
  }

  async execute(email: string, file: Express.Multer.File): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(email);
    if (!userExists) {
      throw new UserNotFoundException();
    }

    const avatar = userExists.getAvatar();
    if (avatar) {
      await this.uploadRepository.remove(avatar);
    }
    const path = await this.uploadRepository.save(userExists.getId(), file);

    return await this.userRepository.updateAvatar(userExists.getId(), path);
  }
}
