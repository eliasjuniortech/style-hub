import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";
import { ErrorCode } from "./enum/error-code.enum";

export class ImageUploadErrorException extends BaseException {
  constructor(message?: string) {
    super(ErrorCode.IMAGE_UPLOAD_ERROR, message ?? `Não foi possível processar o envio da imagem.`, HttpStatus.BAD_REQUEST);
  }
}
