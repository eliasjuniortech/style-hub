import { Module } from "@nestjs/common";
import { UserController } from "./adapters/in/user.controller";
import { UserPersistence } from "./adapters/out/persistence/user.persistence";
import { RegisterUserService } from "./application/service/register-user.service";
import { UserRepository } from "./domain/repository/user.repository";

@Module({
  providers: [
    RegisterUserService,
    {
      provide: UserRepository,
      useClass: UserPersistence,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
