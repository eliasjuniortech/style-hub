import { UpdateUser } from "../../adapters/out/types/update-user.type";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract update(id: string, user: UpdateUser): Promise<User>;
}
