import { Injectable } from "@nestjs/common";
import { HashingRepository } from "../../../../infrastructure/security/hashing/hashing.repository";
import { UploadRepository } from "../../../../infrastructure/upload/upload.repository";
import { EmailAlreadyRegisteredException } from "../../../../shared/exceptions/email-already-registered.exception";
import { RegisterUserDto } from "../../adapters/in/dtos/register-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class RegisterUserService {
  private readonly userRepository: UserRepository;
  private readonly hashingRepository: HashingRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(userRepository: UserRepository, hashingRepository: HashingRepository, uploadRepository: UploadRepository) {
    this.userRepository = userRepository;
    this.hashingRepository = hashingRepository;
    this.uploadRepository = uploadRepository;
  }

  async execute(input: RegisterUserDto, file?: Express.Multer.File): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(input.email);
    if (userExists) {
      throw new EmailAlreadyRegisteredException();
    }

    const id = crypto.randomUUID();
    const hash = await this.hashingRepository.hash(input.password);
    const avatar = file ? await this.uploadRepository.save(id, file) : null;

    const user = User.create(id, input.username, input.email, hash, avatar, new Date(), new Date());
    await this.userRepository.save(user);

    return user;
  }
}
