import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString({ message: "O nome de usuário deve ser um texto válido." })
  @IsNotEmpty({ message: "O nome de usuário é obrigatório." })
  @Matches(/^[\p{L}\s]+$/u, { message: "O nome de usuário deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O nome de usuário deve conter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "O nome de usuário deve conter no máximo 50 caracteres." })
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @IsString({ message: "O sobrenome de usuário deve ser um texto válido." })
  @IsNotEmpty({ message: "O sobrenome de usuário é obrigatório." })
  @Matches(/^[\p{L}\s]+$/u, { message: "O sobrenome de usuário deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O sobrenome de usuário deve conter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "O sobrenome de usuário deve conter no máximo 50 caracteres." })
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @IsEmail({ require_tld: true, allow_ip_domain: false, allow_utf8_local_part: false }, { message: "Informe um endereço de e-mail válido." })
  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  email: string;

  @IsString({ message: "A senha deve ser um texto válido." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: "A senha não é forte o suficiente." })
  @Matches(/^[a-zA-Z0-9!@.$]+$/, { message: "A senha contém caracteres não permitidos." })
  @MaxLength(64, { message: "A senha deve conter no máximo 64 caracteres." })
  password: string;
}
