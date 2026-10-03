import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(ErrorCode.BAD_REQUEST, message, HttpStatus.BAD_REQUEST);
  }
}
