import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class FileStorageException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.FILE_STORAGE_ERROR, message ?? "Não foi possível enviar o arquivo.", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
