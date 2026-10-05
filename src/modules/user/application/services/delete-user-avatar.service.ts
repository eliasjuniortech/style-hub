import { Injectable } from "@nestjs/common";
import { UploadRepository } from "../../../../infrastructure/upload/upload.repository";
import { UserNotFoundException } from "../../../../shared/exceptions/user-not-found.exception";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class DeleteUserAvatarService {
  private readonly userRepository: UserRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(userRepository: UserRepository, uploadRepository: UploadRepository) {
    this.userRepository = userRepository;
    this.uploadRepository = uploadRepository;
  }

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }

    const avatar = user.getAvatar();
    if (avatar) {
      await this.uploadRepository.remove(avatar);
    }
  }
}
