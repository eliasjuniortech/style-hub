import { User } from "../../../user/domain/entities/user.entity";

export abstract class AuthRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;
}
