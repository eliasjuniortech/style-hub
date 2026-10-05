import { BadRequestException, HttpStatus, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { SecurityModule } from "./infrastructure/security/security.module";
import { UploadModule } from "./infrastructure/upload/upload.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SecurityModule,
    UploadModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,

        exceptionFactory: (errors) => {
          const formattedErrors = errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints ?? {}),
          }));

          return new BadRequestException({
            status: HttpStatus.BAD_REQUEST,
            message: "Os dados informados são inválidos.",
            errors: formattedErrors,
          });
        },
      }),
    },
  ],
})
export class AppModule {}
