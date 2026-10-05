import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class UserNotFoundException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.USER_NOT_FOUND, message ?? "Usuário não encontrado.", HttpStatus.NOT_FOUND);
  }
}
