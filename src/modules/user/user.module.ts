import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./adapters/in/user.controller";
import { UserRepositoryAdapter } from "./adapters/out/persistence/user.repository.adapter";
import { DeleteUserAvatarService } from "./application/services/delete-user-avatar.service";
import { DeleteUserService } from "./application/services/delete-user.service";
import { FindUserService } from "./application/services/find-user.service";
import { RegisterUserService } from "./application/services/register-user.service";
import { UpdateUserAvatarService } from "./application/services/update-user-avatar.service";
import { UpdateUserService } from "./application/services/update-user.service";
import { UserRepository } from "./domain/repository/user.repository";

@Module({
  imports: [AuthModule],
  providers: [
    RegisterUserService,
    FindUserService,
    UpdateUserService,
    UpdateUserAvatarService,
    DeleteUserService,
    DeleteUserAvatarService,
    {
      provide: UserRepository,
      useClass: UserRepositoryAdapter,
    },
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
