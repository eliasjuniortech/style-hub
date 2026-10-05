import { UpdateUserDto } from "../../adapters/in/dtos/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract updateAvatar(id: string, path: string): Promise<User>;
}
