import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail({ require_tld: true, allow_ip_domain: false, allow_utf8_local_part: false }, { message: "Informe um endereço de e-mail válido." })
  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  email: string;

  @IsString({ message: "A senha deve ser um texto válido." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  password: string;
}
