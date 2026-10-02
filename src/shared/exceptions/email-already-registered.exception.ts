import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class EmailAlreadyRegisteredException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.EMAIL_ALREADY_REGISTERED, message ?? "O e-mail informado já está cadastrado.", HttpStatus.CONFLICT);
  }
}
