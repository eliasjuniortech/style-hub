import { Transform } from "class-transformer";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsString({ message: "O nome de usuário deve ser um texto válido." })
  @IsOptional()
  @Matches(/^[\p{L}\s]+$/u, { message: "O nome de usuário deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O nome de usuário deve conter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "O nome de usuário deve conter no máximo 50 caracteres." })
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsString({ message: "O sobrenome de usuário deve ser um texto válido." })
  @IsOptional()
  @Matches(/^[\p{L}\s]+$/u, { message: "O sobrenome de usuário deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O sobrenome de usuário deve conter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "O sobrenome de usuário deve conter no máximo 50 caracteres." })
  @Transform(({ value }) => value?.trim())
  lastName?: string;
}
