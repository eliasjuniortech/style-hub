import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./adapters/in/user.controller";
import { UserRepositoryAdapter } from "./adapters/out/persistence/user.repository.adapter";
import { RegisterUserService } from "./application/services/register-user.service";
import { UserRepository } from "./domain/repository/user.repository";

@Module({
  imports: [AuthModule],
  providers: [
    RegisterUserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryAdapter,
    },
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
