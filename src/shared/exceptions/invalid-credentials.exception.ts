import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class InvalidCredentialsException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.INVALID_CREDENTIALS, message ?? "As credenciais informadas são inválidas.", HttpStatus.UNAUTHORIZED);
  }
}
