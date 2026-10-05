import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./adapters/in/auth.controller";
import { JwtRepositoryAdapter } from "./adapters/out/jwt/jwt.repository.adapter";
import { AuthRepositoryAdapter } from "./adapters/out/persistence/auth.repository.adapter";
import { AccessTokenStrategy } from "./adapters/out/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./adapters/out/strategies/refresh-token.strategy";
import { LoginService } from "./application/services/login.service";
import { AuthRepository } from "./domain/repository/auth.repository";
import { JwtRepository } from "./domain/repository/jwt.repository";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
          signOptions: {
            expiresIn: Number(configService.get<number>("ACCESS_TOKEN_EXPIRES_IN")),
          },
        };
      },
    }),
  ],
  providers: [
    LoginService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: JwtRepository,
      useClass: JwtRepositoryAdapter,
    },
    {
      provide: AuthRepository,
      useClass: AuthRepositoryAdapter,
    },
  ],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
