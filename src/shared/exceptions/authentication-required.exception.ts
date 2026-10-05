import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class AuthenticationRequiredException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.AUTHENTICATION_REQUIRED, message ?? "É necessário estar autenticado para acessar este recurso.", HttpStatus.UNAUTHORIZED);
  }
}
