import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./enum/error-code.enum";

export class BaseException extends HttpException {
  constructor(errorCode: ErrorCode, message: string, status: HttpStatus) {
    super({ errorCode: errorCode, message: message }, status);
  }
}
